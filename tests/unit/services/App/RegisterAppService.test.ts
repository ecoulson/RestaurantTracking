import OrganizationBroker from "../../../../src/brokers/OrganizationBroker"
import AppBroker from "../../../../src/brokers/AppBroker"
import PermissionBuilder from "../../../../src/services/Permission/PermissionBuilder"
import RegisterAppService from "../../../../src/services/App/RegisterAppService"
import PermissionSetBroker from "../../../../src/brokers/PermissionSetBroker"
import AppType from "../../../../src/models/App/AppType"
import OrganizationGenerator from "../../../mocks/Generators/OrganizationGenerator"
import AppGenerator from "../../../mocks/Generators/AppGenerator"
import { generateObjectId } from "../../../helpers/mongo"
import PermissionModel from "../../../../src/models/Permission/PermissionModel"
import PermissionGenerator from "../../../mocks/Generators/PermissionGenerator"

const organizationGenerator = new OrganizationGenerator();
const appGenerator = new AppGenerator();
const permissionGenerator = new PermissionGenerator();

describe("Register App Service", () => {
    test("Fail to create app for organization that does not exist", async () => {
        OrganizationBroker.prototype.findOrganizationById = 
            jest.fn().mockResolvedValue(null)
        const service = new RegisterAppService(
            new OrganizationBroker(),
            new AppBroker(),
            new PermissionBuilder(),
            new PermissionSetBroker()
        )

        try {
            await service.register("", "", "", AppType.ContactLogs)
        } catch (error) {
            expect(error).toEqual(new Error(
                "Can not create an app for an organization that does not exist"
            ))
        }

        expect.assertions(1);
    })

    test("Registers an app", async () => {
        const id = generateObjectId();
        appGenerator
            .setOrganizationId(id)
            .setStripeProduct(id)
            .setStripeSubscription(id)
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(organizationGenerator.generate());
        OrganizationBroker.prototype.save =
            jest.fn().mockImplementation(organization => organization);
        PermissionModel.prototype.save = 
            jest.fn().mockResolvedValue(permissionGenerator.generate())
        AppBroker.prototype.createApp =
            jest.fn().mockResolvedValue(appGenerator.generate());
        PermissionSetBroker.prototype.findById =
            jest.fn().mockResolvedValue([]);
        const service = new RegisterAppService(
            new OrganizationBroker(),
            new AppBroker(),
            new PermissionBuilder(),
            new PermissionSetBroker()
        )


        const app = await service.register(id, id, id, AppType.ContactLogs)

        expect(app.stripeSubscriptionId).toEqual(id);
        expect(app.stripeSubscriptionId).toEqual(id);
        expect(app.organizationId).toEqual(id);
        expect(app.type).toEqual(AppType.ContactLogs);
    })
})