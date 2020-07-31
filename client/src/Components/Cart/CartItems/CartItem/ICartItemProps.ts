import { ICartItem, IRemoveFromCartAction } from "../../../../Store/Cart/types";

export default interface ICartItemProps {
    item: ICartItem;
    isCheckingOut: boolean;
    removeItem: (id: string) => IRemoveFromCartAction;
}