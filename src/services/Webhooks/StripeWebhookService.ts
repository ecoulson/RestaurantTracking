import IStripeWebhookService from "./IStripeWebhookService";
import Stripe from "stripe";

export default class StripeWebhookService implements IStripeWebhookService {
    handleEvent(event : Stripe.Event) {
        switch (event.type) {
            case 'invoice.paid':
                // Used to provision services after the trial has ended.
                // The status of the invoice will show up as paid. Store the status in your
                // database to reference when a user accesses your service to avoid hitting rate limits.
                break;
            case 'invoice.payment_failed':
                // If the payment fails or the customer does not have a valid payment method,
                //  an invoice.payment_failed event is sent, the subscription becomes past_due.
                // Use this webhook to notify your user that their payment has
                // failed and to retrieve new card details.
                break;
            case 'invoice.finalized':
                // If you want to manually send out invoices to your customers
                // or store them locally to reference to avoid hitting Stripe rate limits.
                break;
            case 'customer.subscription.deleted':
                if (event.request != null) {
                    // handle a subscription cancelled by your request
                    // from above.
                } else {
                    // handle subscription cancelled automatically based
                    // upon your subscription settings.
                }
                break;
            case 'customer.subscription.trial_will_end':
                if (event.request != null) {
                    // handle a subscription cancelled by your request
                    // from above.
                } else {
                    // handle subscription cancelled automatically based
                    // upon your subscription settings.
                }
                break;
            default:
                // Unexpected event type
        }
    }
}