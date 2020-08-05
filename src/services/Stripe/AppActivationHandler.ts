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
                this.handleInvoicePaid(event.data.object as Stripe.Invoice)
                break;
            case StripeEvents.InvoicePaymentFailed:
                this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
                break;
            default:
                break;
        }
    }

    async handleInvoicePaid(invoice : Stripe.Invoice) {
        const app = await this.appBroker.findBySubscriptionId(this.getSubscriptionId(invoice));
        if (!app.isActive) {
            app.isActive = true;
            this.appBroker.save(app);
        }
    }

    async handleInvoicePaymentFailed(invoice : Stripe.Invoice) {
        const app = await this.appBroker.findBySubscriptionId(this.getSubscriptionId(invoice));
        if (app.isActive) {
            app.isActive = false;
            this.appBroker.save(app);
        }
    }

    getSubscriptionId(invoice : Stripe.Invoice) {
        if (typeof invoice.subscription === "string") {
            return invoice.subscription
        } else {
            return invoice.subscription.id;
        }
    }
}