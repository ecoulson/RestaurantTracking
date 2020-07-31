import IFormValue from "../../../Components/FormInput/IFormValue";

export default interface IPurchaseContactLogsPageState {
    page: number;
    paymentIntentSecret: string;
    billingEmail: IFormValue<string>;
}