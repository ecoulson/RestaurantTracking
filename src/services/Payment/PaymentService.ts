import IPaymentService from "./IPaymentService";
import StripeBroker from "../../brokers/StripeBroker";
import ICartItem from "./ICartItem";

export default class PaymentService implements IPaymentService {
    private stripeBroker : StripeBroker;

    constructor(stripeBroker : StripeBroker) {
        this.stripeBroker = stripeBroker;
    }

    async handlePayment(items: ICartItem[]) {
        console.log(items);
        const price = items.reduce<number>((total: number, item) => {
            return total + item.price
        }, 0) * 100;
        return await this.stripeBroker.createPaymentIntent(price, "usd")
    }
}