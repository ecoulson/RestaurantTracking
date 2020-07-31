import IUpdatePaymentMethodService from "./IUpdatePaymentMethodService";
import StripeBroker from "../../../brokers/StripeBroker";

export default class UpdatePaymentMethodService implements IUpdatePaymentMethodService {
    private stripeBroker : StripeBroker;

    constructor(stripeBroker: StripeBroker) {
        this.stripeBroker = stripeBroker;
    }

    async updatePaymentMethod(customerId: string, paymentMethodId: string) {
        await this.stripeBroker.attachPaymentMethod(paymentMethodId, customerId);
        await this.stripeBroker.updateCustomerPaymentMethod(customerId, paymentMethodId);
    }
}