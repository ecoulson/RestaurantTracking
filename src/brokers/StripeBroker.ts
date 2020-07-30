import { Stripe } from "stripe";

export default class StripeBroker {
    private stripe : Stripe;
    
    constructor(stripe : Stripe) {
        this.stripe = stripe
    }

    async createPaymentIntent(amount : number, currency : string) {
        try {
            return await this.stripe.paymentIntents.create({
                amount, currency
            })
        } catch (error) {
            throw error;
        }
    }
}