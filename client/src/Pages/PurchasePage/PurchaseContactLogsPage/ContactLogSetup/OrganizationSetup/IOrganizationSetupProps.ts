import { ICartItem } from "../../../../../Store/Cart/types";

export default interface IOrganizationSetupProps {
    cart: ICartItem[],
    onPaymentIntent: (clientSecret: string) => void;
}