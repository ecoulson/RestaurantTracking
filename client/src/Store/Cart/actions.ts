import { CartActionTypes, CartActions, ICartItem } from "./types";
import uuid from "uuid"

export function addToCartAction(cartItem: ICartItem) : CartActionTypes {
    return {
        type: CartActions.ADD,
        cartItem : {
            ...cartItem,
            id: uuid.v1()
        }
    }
}

export function removeFromCartAction(id: string) : CartActionTypes {
    return {
        type: CartActions.REMOVE,
        id
    }
}

export function updateItemInCartAction(id: string) : CartActionTypes {
    return {
        type: CartActions.UPDATE,
        id
    }
}