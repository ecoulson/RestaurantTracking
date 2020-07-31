import { CartActions, ICartItem, IAddToCartAction, IRemoveFromCartAction, IUpdateItemInCartAction, ICheckoutModeAction, IShopModeAction } from "./types";
import uuid from "uuid"

export function addToCartAction(cartItem: ICartItem) : IAddToCartAction {
    return {
        type: CartActions.ADD,
        cartItem : {
            ...cartItem,
            id: uuid.v1()
        }
    }
}

export function removeFromCartAction(id: string) : IRemoveFromCartAction {
    return {
        type: CartActions.REMOVE,
        id
    }
}

export function updateItemInCartAction(id: string) : IUpdateItemInCartAction {
    return {
        type: CartActions.UPDATE,
        id
    }
}

export function checkoutModeAction() : ICheckoutModeAction {
    return {
        type: CartActions.CHECKOUT_MODE
    }
}

export function shopModeAction() : IShopModeAction {
    return {
        type: CartActions.SHOP_MODE
    }
}