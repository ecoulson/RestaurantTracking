export interface ICart {
    items: ICartItem[]
}

export interface ICartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    productImage: string;
}

export enum CartActions {
    ADD = "Add",
    REMOVE = "Remove",
    UPDATE = "UPDATE"
}

interface IAddToCartAction {
    type: CartActions.ADD;
    cartItem: ICartItem;
}

interface IRemoveFromCartAction {
    type: CartActions.REMOVE;
    id: string;
}

interface IUpdateItemInCartAction {
    type: CartActions.UPDATE;
    id: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    productImage?: string;
}


export type CartActionTypes = IAddToCartAction | IRemoveFromCartAction | IUpdateItemInCartAction;