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

export interface IAddToCartAction {
    type: CartActions.ADD;
    cartItem: ICartItem;
}

export interface IRemoveFromCartAction {
    type: CartActions.REMOVE;
    id: string;
}

export interface IUpdateItemInCartAction {
    type: CartActions.UPDATE;
    id: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    productImage?: string;
}


export type CartActionTypes = IAddToCartAction | IRemoveFromCartAction | IUpdateItemInCartAction;