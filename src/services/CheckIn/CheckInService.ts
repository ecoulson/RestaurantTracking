import CheckIn from "../../models/CheckIn/CheckInModel";
import ICheckInRequestBody from "../../controllers/CheckIn/ICheckInBody";
import CSV from "../../lib/HTTP/CSV";
import ICheckIn from "../../models/CheckIn/ICheckIn";
import OrganizationBroker from "../../brokers/OrganizationBroker";
import IPermissionBuilder from "../Permission/IPermissionBuilder";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceType from "../../lib/Authorization/ResourceType";
import UserBroker from "../../brokers/UserBroker";
import AppBroker from "../../brokers/AppBroker";
import AppType from "../../models/App/AppType";
import IOrganization from "../../models/Organization/IOrganization";

export default class CheckInService {
    private organizationBroker : OrganizationBroker;
    private permissionBuilder : IPermissionBuilder;
    private userBroker : UserBroker;
    private appBroker : AppBroker

    constructor(organizationBroker : OrganizationBroker, permissionBuilder : IPermissionBuilder, userBroker : UserBroker, appBroker : AppBroker) {
        this.organizationBroker = organizationBroker;
        this.permissionBuilder = permissionBuilder;
        this.userBroker = userBroker;
        this.appBroker = appBroker;
    }

    async checkIn(checkInBody : ICheckInRequestBody, ipAddress : string) : Promise<ICheckIn> {
        await this.ensureOrganizationExists(checkInBody);
        const organization = await this.organizationBroker.findOrganizationById(checkInBody.organizationId);
        this.ensureBuildingExists(organization, checkInBody.building);
        await this.incrementUsage(organization);
        const checkIn = await this.saveCheckInToDB(checkInBody, ipAddress);
        await this.addCheckInReadPermissionToUser(checkIn);
        return checkIn
    }

    private async ensureOrganizationExists(checkIn : ICheckInRequestBody) {
        if (!await this.organizationExists(checkIn.organizationId)) {
            throw new Error("Can not check in to an organization that does not exist")
        }
    }

    private async organizationExists(organizationId : string) {
        return await this.organizationBroker
            .findOrganizationById(organizationId) !== null
    }

    private ensureBuildingExists(organization : IOrganization, building: string) {
        if (!organization.buildings.includes(building)) {
            throw new Error(`Building (${building}) does not exist`)
        }
    }

    private async incrementUsage(organization: IOrganization) {
        const apps = await Promise.all(
            organization.apps.map(appId => this.appBroker.findById(appId))
        )
        const contactLogApp = apps.filter((app) => {
            return app.type === AppType.ContactLogs
        })[0]
        contactLogApp.usage++;
        await this.appBroker.save(contactLogApp);
    }

    private async saveCheckInToDB(checkIn : ICheckInRequestBody, ipAddress: string) : Promise<ICheckIn> {
        try {
            const checkInDocument = new CheckIn({
                userId: checkIn.userId,
                organizationId: checkIn.organizationId,
                timeCheckedIn: checkIn.timeCheckedIn ? checkIn.timeCheckedIn : undefined,
                building: checkIn.building.toLowerCase().split("-").join(" "),
                room: checkIn.room,
                ipAddress: ipAddress
            });
            return await checkInDocument.save();
        } catch (error) {
            throw new Error(`Error when saving check in to organization with ${checkIn.organizationId} from ${ipAddress}`)
        }
    }

    private async addCheckInReadPermissionToUser(checkIn: ICheckIn) {
        const permission = this.permissionBuilder
        .setOperations([OperationType.Read, OperationType.Update])
        .setResourceId(checkIn._id)
        .setResourceType(ResourceType.CheckIn)
        .setRestricted()
        .build();
        await permission.save();
        const user = await this.userBroker.findById(checkIn.userId);
        await user.addPermission(permission);
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