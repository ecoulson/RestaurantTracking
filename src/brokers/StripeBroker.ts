import { Stripe } from "stripe";
import { Request } from "express";
import { v1 as uuid } from "uuid";

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
            return this.stripe.webhooks.constructEvent(
                request.rawBody,
                request.headers["stripe-signature"],
                process.env.STRIPE_WEBHOOK_SECRET
            )
        } catch (error) {
            throw error;
        }
    }

    async createCustomer(email: string, name: string) {
        try {
            return await this.stripe.customers.create({ email, name });
        } catch (error) {
            throw error;
        }
    }

    async attachPaymentMethod(paymentMethodId: string, customerId: string) {
        try {
            await this.stripe.paymentMethods.attach(paymentMethodId, {
                customer: customerId
            });
        } catch (error) {
            throw error;
        }
    }

    async updateCustomerPaymentMethod(customerId: string, paymentMethodId: string) {
        try {
            await this.stripe.customers.update(customerId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async createSubscription(customerId: string, priceIds: string[]) {
        try {
            return await this.stripe.subscriptions.create({
                customer: customerId,
                items: priceIds.map((priceId) => {
                    return {
                        price: priceId,
                    }
                }),
                expand: ['latest_invoice.payment_intent']
            })
        } catch (error) {
            throw error;
        }
    }

    async getSubscription(subscriptionId: string) {
        try {
            return await this.stripe.subscriptions.retrieve(subscriptionId)
        } catch (error) {
            throw error;
        }
    }

    async createUsageRecord(subscriptionItemId: string, quantity: number, timestamp: number) {
        try {
            return await this.stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
                quantity,
                timestamp,
                action: 'set'
            }, {
                idempotencyKey: uuid()
            })
        } catch (error) {
            throw error;
        }
    }

    async getSetupIntent(setupIntentId: string) {
        try {
            return await this.stripe.setupIntents.retrieve(setupIntentId);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(customerId: string, paymentMethodId: string) {
        try {
            return await this.stripe.customers.update(customerId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId
                }
            })
        } catch (error) {
            throw error;
        }
    }
}