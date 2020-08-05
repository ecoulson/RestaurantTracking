import IFormValue from "../../../Components/FormInput/IFormValue";
import IAddress from "../../../Components/AddressInput/IAddress";
import IPrice from "../../../API/GetBillingPlanRequest/IPrice";

export default interface IPurchaseContactLogsPageState {
    page: number;
    billingPlan: IPrice | null;
    paymentIntentSecret: string;
    billingEmail: IFormValue<string>;
    address: IAddress | null;
    organizationName: string;
    organizationId: string;
    shouldCreateOrganization: boolean;
    shouldCreateApp: boolean;   
    stripeProductId: string;
    stripeSubscriptionId: string;
}