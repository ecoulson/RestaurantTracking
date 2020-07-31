import Stripe from "stripe";

export default interface IStripeWebhookService {
    handleEvent(event : Stripe.Event) : void;
}