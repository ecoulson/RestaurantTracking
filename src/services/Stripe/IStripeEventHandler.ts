import StripeEvents from "../Webhooks/StripeEvents";
import Stripe from "stripe";

export default interface IStripeEventHandler {
    handleEvent(type : StripeEvents, event : Stripe.Event) : void
}