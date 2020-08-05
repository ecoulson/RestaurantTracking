import IRequestProps from "../IRequestProps";

export default interface IUpdatePaymentMethodRequest extends IRequestProps<{}> {
    customerId: string;
    paymentMethodId: string;
}