import IOrganizationAccountService from "./IOrganizationAccountService";
import OrganizationBroker from "../../brokers/OrganizationBrooker";
import UserModel from "../../models/user/UserModel";

export default class OrganizationAccountService implements IOrganizationAccountService {
    private organizationBroker : OrganizationBroker;

    constructor() {
        this.organizationBroker = new OrganizationBroker();
    }

    async hasAccount(organizationId: string, email: string) {
        const organization = await this.organizationBroker.findOrganizationById(organizationId);
        const permissionSets = await organization.getPermissionSets();
        const studentPermissionSet = permissionSets.filter((permissionSet) => {
            return permissionSet.name === "student";
        })[0];
        const users = await UserModel.find({
            $and: [
                { permissionSets: [studentPermissionSet._id] },
                { email: email }
            ]
        });
        return users.length === 1;
    }
}