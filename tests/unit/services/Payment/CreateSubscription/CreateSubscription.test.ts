import CreateSubscriptionService from "../../../../../src/services/Payment/CreateSubscription/CreateSubscriptionService"
import StripeBroker from "../../../../../src/brokers/StripeBroker"
import Stripe from "stripe"
import { generateObjectId } from "../../../../helpers/mongo"

jest.mock("stripe")

const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
})

describe("Create Subscription Suite", () => {
    test("Creates a subscription", async() => {
        const paymentMethodId = generateObjectId();
        const customerId = generateObjectId();
        const priceIds = [generateObjectId()];
        StripeBroker.prototype.attachPaymentMethod = jest.fn();
        StripeBroker.prototype.updateCustomerPaymentMethod = jest.fn();
        StripeBroker.prototype.createSubscription = jest.fn();
        const service = new CreateSubscriptionService(
            new StripeBroker(stripe)
        )

        await service.createSubscription(paymentMethodId, customerId, priceIds)

        expect(StripeBroker.prototype.attachPaymentMethod)
            .toHaveBeenCalledWith(paymentMethodId, customerId);
        expect(StripeBroker.prototype.updateCustomerPaymentMethod)
            .toHaveBeenCalledWith(customerId, paymentMethodId);
        expect(StripeBroker.prototype.createSubscription)
            .toHaveBeenCalledWith(customerId, priceIds)
    })
})