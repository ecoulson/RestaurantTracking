import IRegisterOrganizationAccountService from "./IRegisterOrganizationAccountService";
import OrganizationBroker from "../../../brokers/OrganizationBroker";
import IUserRegistrationService from "../../User/Registration/IUserRegistrationService";
import UserRegistrationService from "../../User/Registration/UserRegistrationService";
import IUserPermissionSetupService from "../../User/Registration/IUserPermissionSetupService";

export default class RegisterOrganizationAccountService implements IRegisterOrganizationAccountService {
    private organizationBroker : OrganizationBroker;
    private registrationService : IUserRegistrationService;
    private setupUserPermissionService : IUserPermissionSetupService;

    constructor(organizationBroker : OrganizationBroker, setupUserPermissionService : IUserPermissionSetupService) {
        this.organizationBroker = organizationBroker;
        this.registrationService = new UserRegistrationService();
        this.setupUserPermissionService = setupUserPermissionService;
    }

    async register(email: string, password: string, organizationId: string) {
        const organization = await this.organizationBroker.findOrganizationById(organizationId);
        const user = await this.registrationService.register({
            username: email,
            email,
            firstName: "Student",
            lastName: "Account",
            password
        });
        await this.setupUserPermissionService.setup(user);
        user.organizations.push(organization.organizationId);
        await organization.addStudent(user);
        return await user.save();
    } 
}