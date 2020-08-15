import GetBillingPlanService from "../../../../src/services/BillingPlan/GetBillingPlanService"
import BillingPlanBroker from "../../../../src/brokers/BillingPlanBroker"
import Stripe from "stripe";
import AppType from "../../../../src/models/App/AppType";
import ProductType from "../../../../src/models/App/ProductType";

jest.mock("stripe");

const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
})

describe("Get Billing Plan Service Suite", () => {
    test("No billing plan that matches values", async () => {
        BillingPlanBroker.prototype.getProducts =
            jest.fn().mockResolvedValue({ data: [] });
        const service = new GetBillingPlanService(
            new BillingPlanBroker(stripe)
        );

        try {
            await service.getBillingPlan(AppType.ContactLogs);
        } catch (error) {
            expect(error).toEqual(new Error(`No billing plans for ${AppType.ContactLogs}`))
        }
        expect.assertions(1);
    })

    test("Gets a billing plan", async () => {
        BillingPlanBroker.prototype.getProducts =
            jest.fn().mockResolvedValue({ data: [
                {
                    metadata: {
                        AppType: AppType.ContactLogs,
                        ProductType: ProductType.App
                    }
                }
            ] });
        BillingPlanBroker.prototype.getPrices =
            jest.fn().mockResolvedValue({ data: {} })
        const service = new GetBillingPlanService(
            new BillingPlanBroker(stripe)
        );

        const appPlan = await service.getBillingPlan(AppType.ContactLogs);

        expect(appPlan).toEqual({});
    })
})