import ICancelSubscriptionService from "./ICancelSubscriptionService";
import StripeBroker from "../../../brokers/StripeBroker";
import AppBroker from "../../../brokers/AppBroker";
import OrganizationBroker from "../../../brokers/OrganizationBroker";
import PermissionBroker from "../../../brokers/PermissionBroker";
import PermissionSetBroker from "../../../brokers/PermissionSetBroker";

export default class CancelSubscriptionService implements ICancelSubscriptionService {
    private stripeBroker : StripeBroker;
    private appBroker : AppBroker;
    private organizationBroker : OrganizationBroker;
    private permissionBroker : PermissionBroker;
    private permissionSetBroker : PermissionSetBroker;

    constructor(
        stripeBroker : StripeBroker,
        appBroker : AppBroker,
        organizationBroker : OrganizationBroker,
        permissionBroker : PermissionBroker,
        permissionSetBroker : PermissionSetBroker
    ) {
        this.stripeBroker = stripeBroker;
        this.appBroker = appBroker;
        this.organizationBroker = organizationBroker;
        this.permissionBroker = permissionBroker;
        this.permissionSetBroker = permissionSetBroker;
    }

    async cancelSubscription(subscriptionId: string) {
        const app = await this.appBroker.findBySubscriptionId(subscriptionId);
        const organization = await this.organizationBroker.findOrganizationById(app.organizationId);
        const permissionsToRemove = await this.permissionBroker.findByResourceId(app.id)
        const permissionIdsToRemove = permissionsToRemove.map((permissionToRemove) => {
            return permissionToRemove.id;
        })
        let organizationPermissionSets = await organization.getPermissionSets();

        organization.apps = organization.apps.filter((appId) => {
            return appId !== app.id
        })
        organizationPermissionSets = organizationPermissionSets.map((permissionSet) => {
            permissionSet.permissions = permissionSet.permissions.filter((permissionId) => {
                return !permissionIdsToRemove.includes(permissionId);
            })
            return permissionSet;
        })
        await Promise.all([
            this.appBroker.remove(app),
            Promise.all(permissionsToRemove.map(permission => this.permissionBroker.remove(permission))),
            Promise.all(organizationPermissionSets.map(permissionSet => this.permissionSetBroker.save(permissionSet))),
            this.organizationBroker.save(organization),
            this.stripeBroker.cancelSubscription(app.stripeSubscriptionId)
        ]);
    }
}