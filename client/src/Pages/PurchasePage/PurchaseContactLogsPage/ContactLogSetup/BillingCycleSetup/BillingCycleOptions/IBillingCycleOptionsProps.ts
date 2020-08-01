import IBillingCyclePlan from "../IBillingCyclePlan";
import { IAddToCartAction, IRemoveFromCartAction, ICartItem } from "../../../../../../Store/Cart/types";
import IPrice from "../../../../../../API/GetBillingPlanRequest/IPrice";

export default interface IBillingCycleOptionsProps {
    plans: IPrice[];
    cart: ICartItem[];
    addToCart: (cartItem: ICartItem) => IAddToCartAction;
    removeFromCart: (id: string) => IRemoveFromCartAction;
    onBillingPlan: (billingPlan : IPrice) => void
}