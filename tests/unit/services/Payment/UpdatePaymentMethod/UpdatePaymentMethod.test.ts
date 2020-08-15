import Stripe from "stripe"
import UpdatePaymentMethodService from "../../../../../src/services/Payment/UpdatePaymentMethod/UpdatePaymentMethodService";
import StripeBroker from "../../../../../src/brokers/StripeBroker";
import { generateObjectId } from "../../../../helpers/mongo";

jest.mock("stripe");

const stripe = new Stripe("", {
    apiVersion: "2020-03-02"
})

describe("Update Payment Method Service", () => {
    test("Update Payment Method", async () => {
        StripeBroker.prototype.attachPaymentMethod = jest.fn();
        StripeBroker.prototype.updateCustomerPaymentMethod = jest.fn();
        const paymentMethodId = generateObjectId();
        const customerId = generateObjectId();
        const service = new UpdatePaymentMethodService(
            new StripeBroker(stripe)
        );

        await service.updatePaymentMethod(customerId, paymentMethodId)

        expect(StripeBroker.prototype.attachPaymentMethod)
            .toHaveBeenCalledWith(paymentMethodId, customerId)
        expect(StripeBroker.prototype.updateCustomerPaymentMethod)
            .toHaveBeenCalledWith(customerId, paymentMethodId)
    })
})