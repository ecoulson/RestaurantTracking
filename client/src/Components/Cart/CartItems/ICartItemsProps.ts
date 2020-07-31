import { ICartItem, IRemoveFromCartAction } from "../../../Store/Cart/types";

export default interface ICartItemsProps {
    items: ICartItem[];
    isCheckingOut: boolean;
    removeItem: (id: string) => IRemoveFromCartAction;
}