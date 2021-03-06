import { ICartItem } from "../../../../Store/Cart/types";
import IFormValue from "../../../../Components/FormInput/IFormValue";
import IAddress from "../../../../Components/AddressInput/IAddress";
import IPrice from "../../../../API/GetBillingPlanRequest/IPrice";

export default interface IContactLogSetupProps {
    page: number;
    cart: ICartItem[]
    onBillingPlan: (billingPlan : IPrice | null) => void;
    onPaymentIntent: (clientSecret: string) => void;
    onBillingEmail: (email: IFormValue<string>) => void;
    onAddress: (address : IAddress) => void;
    onOrganizationName: (organizationName: string) => void;
    onOrganizationId: (organizationId: string) => void;
}