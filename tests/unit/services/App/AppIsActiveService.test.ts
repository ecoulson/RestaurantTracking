import AppBroker from "../../../../src/brokers/AppBroker"
import AppIsActiveService from "../../../../src/services/App/AppIsActiveService";
import AppType from "../../../../src/models/App/AppType";

afterEach(() => {
    jest.resetAllMocks();
}) 

describe("App Is Active Service Tests", () => {
    test("Organization does not have app", async () => {
        AppBroker.prototype.findByOrganizationId = jest.fn().mockResolvedValue(null);
        
        const service = new AppIsActiveService(new AppBroker());
        try {
            await service.isActive(AppType.ContactLogs, "foo");
        } catch (error) {
            expect(error).toEqual(new Error(`[foo]: does not have a registered ${AppType.ContactLogs} application`))
        }
        expect.assertions(1);
    })

    test("Organization does not have app", async () => {
        AppBroker.prototype.findByOrganizationId = jest.fn().mockResolvedValue({ isActive: true });
        
        const service = new AppIsActiveService(new AppBroker());
        const isActive = await service.isActive(AppType.ContactLogs, "foo");
        
        expect(isActive).toBeTruthy();
    })
})