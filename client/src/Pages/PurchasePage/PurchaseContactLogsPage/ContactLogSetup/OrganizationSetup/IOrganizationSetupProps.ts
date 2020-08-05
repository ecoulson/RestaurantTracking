import { ICartItem } from "../../../../../Store/Cart/types";
import IFormValue from "../../../../../Components/FormInput/IFormValue";
import IAddress from "../../../../../Components/AddressInput/IAddress";

export default interface IOrganizationSetupProps {
    cart: ICartItem[],
    onPaymentIntent: (clientSecret: string) => void;
    onBillingEmail: (email: IFormValue<string>) => void;
    onAddress: (address: IAddress) => void;
    onOrganizationName: (organizationName: string) => void;
    onOrganizationId: (organizationId: string) => void;
}