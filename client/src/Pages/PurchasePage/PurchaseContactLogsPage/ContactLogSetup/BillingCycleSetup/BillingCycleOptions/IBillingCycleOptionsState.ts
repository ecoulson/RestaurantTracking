import { ICartItem, IAddToCartAction } from "../../../../../../Store/Cart/types";

export default interface IBillingCycleOptionsState {
    activeIndex: number;
    item: IAddToCartAction | null; 
}