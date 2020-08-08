import OrganizationBroker from "../../../../src/brokers/OrganizationBroker"
import AppBroker from "../../../../src/brokers/AppBroker"
import PermissionBuilder from "../../../../src/services/Permission/PermissionBuilder"
import RegisterAppService from "../../../../src/services/App/RegisterAppService"
import PermissionSetBroker from "../../../../src/brokers/PermissionSetBroker"
import AppType from "../../../../src/models/App/AppType"

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
})