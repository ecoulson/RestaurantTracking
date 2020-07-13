import IRegisterOrganizationService from "./IRegisterOrganizationService";
import IOrganization from "../../models/Organization/IOrganization";
import OrganizationModel from "../../models/Organization/OrganizationModel";
import PermissionSetService from "../Permission/PermissionSetService";
import IPermissionBuilder from "../Permission/IPermissionBuilder";
import PermissionBuilder from "../Permission/PermissionBuilder";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceType from "../../lib/Authorization/ResourceType";

export default class RegisterOrganizationService implements IRegisterOrganizationService {
    private permissionSetService : PermissionSetService;
    private permissionBuilder : IPermissionBuilder;

    constructor() {
        this.permissionSetService = new PermissionSetService();
        this.permissionBuilder = new PermissionBuilder();
    }

    async registerOrganization(organizationId: string, organizationName: string): Promise<IOrganization> {
        const organization = new OrganizationModel({ organizationId, organizationName });
        const studentPermissionSet = await this.permissionSetService.create("student");
        await organization.addPermissionSet(studentPermissionSet);
        const writePermission = this.createCheckInPermission(organization);
        await Promise.all([
            organization.save(),
            writePermission.save(),
            studentPermissionSet.addPermission(writePermission),
        ])
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
}