import IRegisterAppService from "./IRegisterAppService";
import AppType from "../../models/App/AppType";
import OrganizationBroker from "../../brokers/OrganizationBroker";
import AppBroker from "../../brokers/AppBroker";
import IOrganization from "../../models/Organization/IOrganization";
import IPermissionBuilder from "../Permission/IPermissionBuilder";
import OperationType from "../../lib/Authorization/OperationType";
import IApp from "../../models/App/IApp";
import ResourceType from "../../lib/Authorization/ResourceType";
import IPermission from "../../models/Permission/IPermission";
import PermissionSetBroker from "../../brokers/PermissionSetBroker";

export default class RegisterAppService implements IRegisterAppService {
    private organizationBroker : OrganizationBroker;
    private appBroker : AppBroker;
    private permissionBuilder : IPermissionBuilder;
    private permissionSetBroker : PermissionSetBroker;

    constructor(
        organizationBroker : OrganizationBroker, 
        appBroker : AppBroker, 
        permissionBuilder : IPermissionBuilder,
        permissionSetBroker : PermissionSetBroker
    ) {
        this.organizationBroker = organizationBroker;
        this.appBroker = appBroker;
        this.permissionBuilder = permissionBuilder;
    }

    async register(organizationId: string, type: AppType) {
        const organization = await this.organizationBroker.findOrganizationById(organizationId);
        const app = await this.appBroker.createApp(organizationId, type);
        const permission = await this.createWritePrmission(app);
        organization.apps.push(app.id);
        await this.addPermissionToOrganizationSets(permission, organization)
        await organization.save();
        return app;
    }

    async createWritePrmission(app : IApp) {
        return await this.permissionBuilder
            .setOperations([OperationType.Create])
            .setResourceId(app.id)
            .setResourceType(ResourceType.ContactLogApp)
            .setRestricted()
            .build()
            .save();
    }

    async addPermissionToOrganizationSets(permission : IPermission, organization : IOrganization) {
        const permissionSets = await Promise.all(organization.permissionSets.map((id) => {
            return this.permissionSetBroker.findById(id);
        }))
        await Promise.all(permissionSets.map((set) => {
            return set.addPermission(permission)
        }));
    }
}