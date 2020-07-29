import { ICartItem, IRemoveFromCartAction } from "../../../Store/Cart/types";

export default interface ICartItemsProps {
    items: ICartItem[]
    removeItem: (id: string) => IRemoveFromCartAction;
}