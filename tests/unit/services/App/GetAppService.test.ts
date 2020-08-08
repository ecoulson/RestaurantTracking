import AppBroker from "../../../../src/brokers/AppBroker";
import GetAppService from "../../../../src/services/App/GetAppService";
import { generateObjectId } from "../../../helpers/mongo";
import AppGenerator from "../../../mocks/Generators/AppGenerator";

const appGenerator = new AppGenerator();

describe("Get App Service", () => {
    test("Get app that does not exist", async () => {
        const id = generateObjectId();
        AppBroker.prototype.findById = jest.fn().mockResolvedValue(null);
        const service = new GetAppService(new AppBroker());

        try {
            await service.getApp(id);
        } catch (error) {
            expect(error).toEqual(new Error(`No app with id: ${id}`))
        }

        expect.assertions(1);
    })

    test("Gets an app", async () => {
        const app = appGenerator.generate();
        AppBroker.prototype.findById = jest.fn().mockResolvedValue(app);
        const service = new GetAppService(new AppBroker());

        const retrievedApp = await service.getApp(app.id);

        expect(app.id).toEqual(retrievedApp.id);
    })
})