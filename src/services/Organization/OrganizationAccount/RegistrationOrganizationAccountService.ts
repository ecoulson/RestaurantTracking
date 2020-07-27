import IRegisterOrganizationAccountService from "./IRegisterOrganizationAccountService";
import OrganizationBroker from "../../../brokers/OrganizationBroker";
import IUserRegistrationService from "../../User/Registration/IUserRegistrationService";
import UserRegistrationService from "../../User/Registration/UserRegistrationService";
import IUserPermissionSetupService from "../../User/Registration/IUserPermissionSetupService";
import UserBroker from "../../../brokers/UserBroker";

export default class RegisterOrganizationAccountService implements IRegisterOrganizationAccountService {
    private organizationBroker : OrganizationBroker;
    private registrationService : IUserRegistrationService;
    private setupUserPermissionService : IUserPermissionSetupService;
    private userBroker : UserBroker

    constructor(organizationBroker : OrganizationBroker, setupUserPermissionService : IUserPermissionSetupService, userBroker : UserBroker) {
        this.organizationBroker = organizationBroker;
        this.registrationService = new UserRegistrationService();
        this.userBroker = userBroker
        this.setupUserPermissionService = setupUserPermissionService;
    }

    async register(email: string, password: string, organizationId: string) {
        const organization = await this.organizationBroker.findOrganizationById(organizationId);
        let user = await this.userBroker.findUserByEmail(email);
        if (!user) {
            user = await this.registrationService.register({
                username: email,
                email,
                firstName: "Student",
                lastName: "Account",
                password
            });
            await this.setupUserPermissionService.setup(user);
        }
        user.organizations.push(organization.organizationId);
        await organization.addStudent(user);
        return await user.save();
    } 
}