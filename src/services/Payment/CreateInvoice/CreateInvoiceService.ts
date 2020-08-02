import ICreateInvoiceService from "./ICreateInvoiceService";
import StripeBroker from "../../../brokers/StripeBroker";

export default class CreateInvoiceService implements ICreateInvoiceService {
    private stripeBroker : StripeBroker;

    constructor(stripeBroker : StripeBroker) {
        this.stripeBroker = stripeBroker;
    }

    async createInvoice(customerId: string, cartItems: any) {
        await Promise.all(
            cartItems.map(async (cartItem : any) => await this.stripeBroker.createInvoiceItem(
                customerId, cartItem.description, cartItem.price
            ))
        );
    }
}