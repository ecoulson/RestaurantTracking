import IRegisterOrganizationService from "./IRegisterOrganizationService";
import IOrganization from "../../../models/Organization/IOrganization";
import OrganizationModel from "../../../models/Organization/OrganizationModel";
import PermissionSetService from "../../Permission/PermissionSetService";
import IPermissionBuilder from "../../Permission/IPermissionBuilder";
import PermissionBuilder from "../../Permission/PermissionBuilder";
import OperationType from "../../../lib/Authorization/OperationType";
import ResourceType from "../../../lib/Authorization/ResourceType";
import IUser from "../../../models/User/IUser";

export default class RegisterOrganizationService implements IRegisterOrganizationService {
    private permissionSetService : PermissionSetService;
    private permissionBuilder : IPermissionBuilder;

    constructor() {
        this.permissionSetService = new PermissionSetService();
        this.permissionBuilder = new PermissionBuilder();
    }

    async registerOrganization(organizationId: string, organizationName: string, user : IUser): Promise<IOrganization> {
        const organization = new OrganizationModel({ organizationId, organizationName });
        const studentPermissionSet = await this.permissionSetService.create("student");
        const adminPermissionSet = await this.permissionSetService.create("admin");
        await organization.addPermissionSet(studentPermissionSet);
        await organization.addPermissionSet(adminPermissionSet);
        const writePermission = this.createCheckInPermission(organization);
        const adminPermission = this.createAdminPermission(organization);
        await Promise.all([
            organization.save(),
            writePermission.save(),
            adminPermission.save(),
        ])
        await studentPermissionSet.addPermission(writePermission),
        await adminPermissionSet.addPermission(adminPermission)
        await user.addPermissionSet(adminPermissionSet)
        return organization;
    }

    private createCheckInPermission(organization : IOrganization) {
        return this.permissionBuilder
            .setOperations([OperationType.Create])
            .setResourceId(organization._id)
            .setResourceType(ResourceType.Organization)
            .setRestricted()
            .build()
    }

    private createAdminPermission(organization : IOrganization) {
        return this.permissionBuilder
            .setOperations([OperationType.Any])
            .setResourceId(organization._id)
            .setResourceType(ResourceType.Organization)
            .setRestricted()
            .build()
    }
}