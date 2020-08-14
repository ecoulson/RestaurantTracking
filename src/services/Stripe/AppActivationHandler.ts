import IStripeEventHandler from "./IStripeEventHandler";
import StripeEvents from "../Webhooks/StripeEvents";
import Stripe from "stripe";
import AppBroker from "../../brokers/AppBroker";

export default class AppActivationHandler implements IStripeEventHandler {
    private appBroker : AppBroker;

    constructor(appBroker : AppBroker) {
        this.appBroker = appBroker
    }

    async handleEvent(type: StripeEvents, event : Stripe.Event) {
        switch(type) { 
            case StripeEvents.InvoicePaid:
                await this.handleInvoicePaid(event.data.object as Stripe.Invoice)
                break;
            case StripeEvents.InvoicePaymentFailed:
                await this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
                break;
            default:
                break;
        }
    }

    private async handleInvoicePaid(invoice : Stripe.Invoice) {
        const subscriptionId = this.getSubscriptionId(invoice);
        const app = await this.appBroker.findBySubscriptionId(subscriptionId);
        if (!app) {
            throw new Error(
                `No app associated with subscription ${subscriptionId}`
            )
        }
        if (!app.isActive) {
            app.isActive = true;
            await this.appBroker.save(app);
        }
    }

    private async handleInvoicePaymentFailed(invoice : Stripe.Invoice) {
        const subscriptionId = this.getSubscriptionId(invoice);
        const app = await this.appBroker.findBySubscriptionId(subscriptionId);
        if (!app) {
            throw new Error(
                `No app associated with subscription ${subscriptionId}`
            )
        }
        if (app.isActive) {
            app.isActive = false;
            await this.appBroker.save(app);
        }
    }

    private getSubscriptionId(invoice : Stripe.Invoice) {
        if (typeof invoice.subscription === "string") {
            return invoice.subscription
        } else {
            return invoice.subscription.id;
        }
    }
}