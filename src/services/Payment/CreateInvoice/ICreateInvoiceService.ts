import Stripe from "stripe";

export default interface ICreateInvoiceService {
    createInvoice(customerId : string, cartItems: any) : Promise<Stripe.InvoiceItem[]>
}
