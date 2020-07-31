import { Stripe } from "stripe";
import { Request } from "express";

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

    constructWebhookEvent(request : Request) {
        try {
            // console.log(request.body, request.headers["stripe-signature"])
            return this.stripe.webhooks.constructEvent(
                request.rawBody,
                request.headers["stripe-signature"],
                process.env.STRIPE_WEBHOOK_SECRET
            )
        } catch (error) {
            throw error;
        }
    }
}