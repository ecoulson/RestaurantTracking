import Stripe from "stripe";
import ICartItem from "./ICartItem";

export default interface IPaymentService {
    handlePayment(items: ICartItem[]) : Promise<Stripe.PaymentIntent>
}