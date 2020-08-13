import CancelSubscriptionService from "../../../../../src/services/Payment/CancelSubscription/CancelSubscriptionService"
import Stripe from "stripe";
import StripeBroker from "../../../../../src/brokers/StripeBroker";
import AppBroker from "../../../../../src/brokers/AppBroker";
import OrganizationBroker from "../../../../../src/brokers/OrganizationBroker";
import PermissionBroker from "../../../../../src/brokers/PermissionBroker";
import PermissionSetBroker from "../../../../../src/brokers/PermissionSetBroker";
import { generateObjectId } from "../../../../helpers/mongo";
import AppGenerator from "../../../../mocks/Generators/AppGenerator";
import OrganizationGenerator from "../../../../mocks/Generators/OrganizationGenerator";
import PermissionGenerator from "../../../../mocks/Generators/PermissionGenerator";
import OrganizationModel from "../../../../../src/models/Organization/OrganizationModel";
import PermissionSetGenerator from "../../../../mocks/Generators/PermissionSetGenerator";

jest.mock("stripe");

const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
});
const appGenerator = new AppGenerator();
const organizationGenerator = new OrganizationGenerator();
const permissionGenerator = new PermissionGenerator();
const permissionSetGenerator = new PermissionSetGenerator();

describe("Cancel Subscription Service", () => {
    test("No app with subscription id", async () => {
        const subscriptionId = generateObjectId();
        AppBroker.prototype.findBySubscriptionId =
            jest.fn().mockResolvedValue(null);
        const service = new CancelSubscriptionService(
            new StripeBroker(stripe),
            new AppBroker(),
            new OrganizationBroker(),
            new PermissionBroker(),
            new PermissionSetBroker()
        )

        try {
            await service.cancelSubscription(subscriptionId)
        } catch (error) {
            expect(error).toEqual(
                new Error(`No app with subscription id ${subscriptionId}`)
            )
        }
        expect.assertions(1);
    })

    test("Cancels subscription for orphaned", async () => {
        const subscriptionId = generateObjectId();
        appGenerator.setStripeSubscription(subscriptionId)
        const app = appGenerator.generate();
        AppBroker.prototype.findBySubscriptionId =
            jest.fn().mockResolvedValue(app);
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(null);
        StripeBroker.prototype.cancelSubscription = jest.fn();
        AppBroker.prototype.remove = jest.fn();
        const service = new CancelSubscriptionService(
            new StripeBroker(stripe),
            new AppBroker(),
            new OrganizationBroker(),
            new PermissionBroker(),
            new PermissionSetBroker()
        )

        await service.cancelSubscription(subscriptionId)

        expect(AppBroker.prototype.remove).toHaveBeenCalledWith(app);
        expect(StripeBroker.prototype.cancelSubscription)
            .toHaveBeenCalledWith(subscriptionId)
    })

    test("Cancels a subscription", async () => {
        const subscriptionId = generateObjectId();
        const organization = organizationGenerator.generate()
        const permissions = [permissionGenerator.generate()]
        const permissionSets = [permissionSetGenerator.generate()]
        appGenerator
            .setStripeSubscription(subscriptionId)
            .setOrganizationId(organization.organizationId);
        const app = appGenerator.generate();
        organization.apps.push(app.id);
        AppBroker.prototype.findBySubscriptionId =
            jest.fn().mockResolvedValue(app);
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(organization);
        OrganizationBroker.prototype.save =
            jest.fn().mockImplementation(x => x);
        OrganizationModel.prototype.getPermissionSets =
            jest.fn().mockResolvedValue(permissionSets)
        StripeBroker.prototype.cancelSubscription = jest.fn();
        AppBroker.prototype.remove = jest.fn();
        PermissionBroker.prototype.findByResourceId =
            jest.fn().mockResolvedValue(permissions)
        PermissionBroker.prototype.remove = jest.fn();
        PermissionSetBroker.prototype.save =
            jest.fn().mockImplementation(x => x)
        const service = new CancelSubscriptionService(
            new StripeBroker(stripe),
            new AppBroker(),
            new OrganizationBroker(),
            new PermissionBroker(),
            new PermissionSetBroker()
        )

        await service.cancelSubscription(subscriptionId)

        expect(AppBroker.prototype.remove).toHaveBeenCalledWith(app);
        expect(StripeBroker.prototype.cancelSubscription)
            .toHaveBeenCalledWith(subscriptionId)
        expect(OrganizationBroker.prototype.save)
            .toHaveBeenCalledWith(organization)
        expect(PermissionBroker.prototype.remove)
            .toHaveBeenCalledWith(permissions[0])
        expect(PermissionBroker.prototype.remove)
            .toHaveBeenCalledTimes(1)
        expect(PermissionSetBroker.prototype.save)
            .toHaveBeenCalledWith(permissionSets[0])
        expect(PermissionSetBroker.prototype.save)
            .toHaveBeenCalledTimes(1);
    })
})