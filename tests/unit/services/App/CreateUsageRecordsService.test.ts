import StripeBroker from "../../../../src/brokers/StripeBroker"
import { generateObjectId } from "../../../helpers/mongo"
import AppBroker from "../../../../src/brokers/AppBroker"
import CreateUsageRecordsService from "../../../../src/services/App/CreateUsageRecordsService"
import Stripe from "stripe"
import AppGenerator from "../../../mocks/Generators/AppGenerator"
import faker from "faker";

jest.mock("stripe");

const appGenerator = new AppGenerator();
const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
});

describe("Create Usage Records Service", () => {
    test("Creates a subscription", async () => {
        StripeBroker.prototype.getSubscription = jest.fn().mockResolvedValue({
            items: { data: [ { id: generateObjectId() } ] }
        })
        StripeBroker.prototype.createUsageRecord = jest.fn();
        AppBroker.prototype.save = jest.fn().mockImplementation(app => app)
        const service = new CreateUsageRecordsService(
            new AppBroker(),
            new StripeBroker(stripe)
        )
        appGenerator.setUsage(faker.random.number())
        const app = appGenerator.generate();

        await service.createUsageRecord(app)

        expect(app.usage).toEqual(0)
    })
})