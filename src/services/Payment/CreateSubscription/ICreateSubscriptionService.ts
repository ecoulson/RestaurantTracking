import Stripe from "stripe";

export default interface ICreateSubscriptionService {
    createSubscription(
        paymentMethodId: string,
        customerId: string,
        priceIds: string[]
    ) : Promise<Stripe.Subscription>
}