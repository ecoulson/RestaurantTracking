import IRequestProps from "../IRequestProps";

export default interface IRegisterAppRequest extends IRequestProps<{}> {
    organizationId: string;
    stripeProductId: string;
    stripeSubscriptionId: string;
}