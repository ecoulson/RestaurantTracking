import Stripe from "stripe";

export default class BillingPlanBroker {
    private stripe : Stripe;

    constructor(stripe : Stripe) {
        this.stripe = stripe;
    }

    async getProducts() {
        try {
            return await this.stripe.products.list();
        } catch (error) {
            throw error;
        }
    }

    async getPrices(productId: string) {
        try {
            return await this.stripe.plans.list({
                product: productId
            })
        } catch (error) {
            throw error;
        }
    }
}