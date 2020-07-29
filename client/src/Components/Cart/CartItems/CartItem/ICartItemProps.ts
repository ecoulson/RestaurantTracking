import { ICartItem, IRemoveFromCartAction } from "../../../../Store/Cart/types";

export default interface ICartItemProps {
    item: ICartItem;
    removeItem: (id: string) => IRemoveFromCartAction;
}