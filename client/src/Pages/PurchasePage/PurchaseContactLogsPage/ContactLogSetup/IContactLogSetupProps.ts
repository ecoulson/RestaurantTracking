import { ICartItem } from "../../../../Store/Cart/types";

export default interface IContactLogSetupProps {
    page: number;
    cart: ICartItem[]
    onPaymentIntent: (clientSecret: string) => void;
}