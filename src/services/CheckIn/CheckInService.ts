import CheckIn from "../../models/CheckIn/CheckInModel";
import ICheckInRequestBody from "../../controllers/CheckIn/ICheckInBody";
import CSV from "../../lib/HTTP/CSV";
import ICheckIn from "../../models/CheckIn/ICheckIn";
import OrganizationBroker from "../../brokers/OrganizationBroker";
import IPermissionBuilder from "../Permission/IPermissionBuilder";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceType from "../../lib/Authorization/ResourceType";
import UserBroker from "../../brokers/UserBroker";

export default class CheckInService {
    private organizationBroker : OrganizationBroker;
    private permissionBuilder : IPermissionBuilder;
    private userBroker : UserBroker;

    constructor(organizationBroker : OrganizationBroker, permissionBuilder : IPermissionBuilder, userBroker : UserBroker) {
        this.organizationBroker = organizationBroker;
        this.permissionBuilder = permissionBuilder;
        this.userBroker = userBroker;
    }

    async checkIn(checkInBody : ICheckInRequestBody, ipAddress : string) : Promise<ICheckIn> {
        await this.ensureRestaurantExists(checkInBody);
        const checkIn = await this.saveCheckInToDB(checkInBody, ipAddress);
        const permission = this.permissionBuilder
            .setOperations([OperationType.Read, OperationType.Update])
            .setResourceId(checkIn._id)
            .setResourceType(ResourceType.CheckIn)
            .setRestricted()
            .build();
        await permission.save();
        const user = await this.userBroker.findById(checkIn.userId);
        await user.addPermission(permission);
        return checkIn
    }

    private async ensureRestaurantExists(checkIn : ICheckInRequestBody) {
        if (!await this.organizationExists(checkIn.organizationId)) {
            throw new Error("Can not check in to an organization that does not exist")
        }
    }

    private async organizationExists(organizationId : string) {
        return await this.organizationBroker.findOrganizationById(organizationId) !== null
    }

    private async saveCheckInToDB(checkIn : ICheckInRequestBody, ipAddress: string) : Promise<ICheckIn> {
        try {
            const checkInDocument = new CheckIn({
                userId: checkIn.userId,
                organizationId: checkIn.organizationId,
                timeCheckedIn: checkIn.timeCheckedIn ? checkIn.timeCheckedIn : undefined,
                building: checkIn.building,
                room: checkIn.room,
                ipAddress: ipAddress
            });
            return await checkInDocument.save();
        } catch (error) {
            throw new Error(`Error when saving check in to organization with ${checkIn.organizationId} from ${ipAddress}`)
        }
    }

    async getOrganizationReport(organizationId : string) : Promise<string> {
        if (!await this.organizationExists(organizationId)) {
            throw new Error(`Could not generate report for ${organizationId} because it does not exist`);
        }
        const checkIns = await CheckIn.findByOrganizationId(organizationId);
        return CSV.JSONtoCSV(this.getSerializedCheckIns(checkIns));
    }

    private getSerializedCheckIns(checkIns : ICheckIn[]) {
        let serializedCheckIns = [];
        for (let i = 0; i < checkIns.length; i++) {
            serializedCheckIns.push(checkIns[i].serialize());
        }
        return serializedCheckIns;
    }
}