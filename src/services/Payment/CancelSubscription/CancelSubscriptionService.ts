import ICancelSubscriptionService from "./ICancelSubscriptionService";
import StripeBroker from "../../../brokers/StripeBroker";
import AppBroker from "../../../brokers/AppBroker";
import OrganizationBroker from "../../../brokers/OrganizationBroker";
import PermissionBroker from "../../../brokers/PermissionBroker";
import PermissionSetBroker from "../../../brokers/PermissionSetBroker";
import IOrganization from "../../../models/Organization/IOrganization";
import IApp from "../../../models/App/IApp";

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
        const app = await this.getApp(subscriptionId);
        const organization = await this.organizationBroker.findOrganizationById(app.organizationId);
        if (this.appIsOrphaned(organization)) {
            return this.removeOrphanedApplication(app)
        }
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
            Promise.all(permissionsToRemove.map(
                permission => this.permissionBroker.remove(permission)
            )),
            Promise.all(organizationPermissionSets.map(
                permissionSet => this.permissionSetBroker.save(permissionSet)
            )),
            this.organizationBroker.save(organization),
            this.stripeBroker.cancelSubscription(app.stripeSubscriptionId)
        ]);
    }

    private async getApp(subscriptionId : string) {
        const app = await this.appBroker.findBySubscriptionId(subscriptionId);
        if (!app) {
            throw new Error(`No app with subscription id ${subscriptionId}`)
        }
        return app;
    }

    private appIsOrphaned(organization : IOrganization) {
        return organization === null;
    }

    private async removeOrphanedApplication(app : IApp) {
        await Promise.all([
            this.stripeBroker.cancelSubscription(app.stripeSubscriptionId),
            this.appBroker.remove(app)
        ])
    }
}