import ICreateSubscriptionService from "./ICreateSubscriptionService";
import StripeBroker from "../../../brokers/StripeBroker";

export default class CreateSubscriptionService implements ICreateSubscriptionService {
    private stripeBroker : StripeBroker;

    constructor(stripeBroker : StripeBroker) {
        this.stripeBroker = stripeBroker;
    }

    async createSubscription(paymentMethodId: string, customerId: string, priceIds: string[]) {
        await this.stripeBroker.attachPaymentMethod(paymentMethodId, customerId);
        await this.stripeBroker.updateCustomerPaymentMethod(customerId, paymentMethodId);
        return this.stripeBroker.createSubscription(customerId, priceIds);
    }
}