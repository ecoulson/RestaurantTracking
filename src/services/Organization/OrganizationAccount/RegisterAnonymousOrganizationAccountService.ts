import IRegisterOrganizationAccountService from "./IRegisterOrganizationAccountService";
import UserBroker from "../../../brokers/UserBroker";
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

    async register(params: {
        email: string, 
        password: string,
        username: string,
        firstName: string,
        lastName?: string,
        organizationId: string
    }) {
        const organization = await this.organizationBroker.findOrganizationById(params.organizationId);
        if (!organization) {
            throw new Error(`No organization with id: ${params.organizationId}`)
        }
        const user = await this.userBroker.createUser({
            username: params.username,
            email: params.email,
            firstName: params.firstName,
            lastName: params.lastName,
            password: params.password,
            anonymous: true
        });
        await this.userSetup.setup(user);
        user.organizations.push(params.organizationId);
        await organization.addStudent(user);
        return await this.userBroker.save(user);
    }
}