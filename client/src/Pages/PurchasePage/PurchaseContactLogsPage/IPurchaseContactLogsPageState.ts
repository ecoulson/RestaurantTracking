import IFormValue from "../../../Components/FormInput/IFormValue";
import IAddress from "../../../Components/AddressInput/IAddress";

export default interface IPurchaseContactLogsPageState {
    page: number;
    paymentIntentSecret: string;
    billingEmail: IFormValue<string>;
    address: IAddress;
    organizationName: string;
    organizationId: string;
    shouldCreateOrganization: boolean;
    shouldCreateApp: boolean;   
    stripeProductId: string;
    stripeSubscriptionId: string;
}