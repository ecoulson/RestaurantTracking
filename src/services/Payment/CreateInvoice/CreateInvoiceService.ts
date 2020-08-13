import ICreateInvoiceService from "./ICreateInvoiceService";
import StripeBroker from "../../../brokers/StripeBroker";
import Stripe from "stripe";

export default class CreateInvoiceService implements ICreateInvoiceService {
    private stripeBroker : StripeBroker;

    constructor(stripeBroker : StripeBroker) {
        this.stripeBroker = stripeBroker;
    }

    async createInvoice(customerId: string, cartItems: any) {
        return await Promise.all(
            cartItems.map(async (cartItem : any) => 
                await this.stripeBroker.createInvoiceItem(
                    customerId, cartItem.description, cartItem.price
                )
            )
        ) as Stripe.InvoiceItem[];
    }
}