import IRequestProps from "../IRequestProps";

export default interface ICancelSubscriptionRequest extends IRequestProps<{}> {
    subscriptionId: string;
}