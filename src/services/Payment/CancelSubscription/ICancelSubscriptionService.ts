export default interface ICancelSubscriptionService {
    cancelSubscription(subscriptionId: string) : Promise<void>;
}