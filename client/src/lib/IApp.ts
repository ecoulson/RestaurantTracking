export default interface IApp {
    isActive: boolean;
    usage: number;
    organizationId: string;
    stripeProductId: string;
    stripeSubscriptionId: string;
}