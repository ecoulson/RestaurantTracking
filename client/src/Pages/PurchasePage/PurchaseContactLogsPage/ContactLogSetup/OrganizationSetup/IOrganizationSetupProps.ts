import { ICartItem } from "../../../../../Store/Cart/types";
import IFormValue from "../../../../../Components/FormInput/IFormValue";

export default interface IOrganizationSetupProps {
    cart: ICartItem[],
    onPaymentIntent: (clientSecret: string) => void;
    onBillingEmail: (email: IFormValue<string>) => void;
}