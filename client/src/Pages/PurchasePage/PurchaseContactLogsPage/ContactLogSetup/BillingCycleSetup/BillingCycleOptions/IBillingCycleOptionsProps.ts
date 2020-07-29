import IBillingCyclePlan from "../IBillingCyclePlan";
import { IAddToCartAction, IRemoveFromCartAction, ICartItem } from "../../../../../../Store/Cart/types";

export default interface IBillingCycleOptionsProps {
    plans: IBillingCyclePlan[];
    cart: ICartItem[];
    addToCart: (cartItem: ICartItem) => IAddToCartAction;
    removeFromCart: (id: string) => IRemoveFromCartAction;
}