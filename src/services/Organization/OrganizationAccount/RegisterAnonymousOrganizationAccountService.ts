import IRegisterOrganizationAccountService from "./IRegisterOrganizationAccountService";
import UserBroker from "../../../brokers/UserBroker";
import { v1 } from "uuid";
import IUserPermissionSetupService from "../../User/Registration/IUserPermissionSetupService";
import OrganizationBroker from "../../../brokers/OrganizationBroker";

export default class RegisterAnonymousOrganizationAccountService implements IRegisterOrganizationAccountService {
    private userBroker : UserBroker;
    private userSetup : IUserPermissionSetupService;
    private organizationBroker : OrganizationBroker;

    constructor(userBroker : UserBroker, userSetup : IUserPermissionSetupService, organizationBroker : OrganizationBroker) {
        this.userBroker = userBroker;
        this.userSetup = userSetup;
        this.organizationBroker = organizationBroker;
    }

    async register(email: string, password: string, organizationId: string) {
        const organization = await this.organizationBroker.findOrganizationById(organizationId);
        const user = await this.userBroker.createUser({
            username: v1(),
            email,
            firstName: "Anonymous",
            password
        });
        await this.userSetup.setup(user);
        user.organizations.push(organizationId);
        await organization.addStudent(user);
        return await this.userBroker.save(user);
    }
}