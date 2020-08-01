import { CartActions, ICartItem, IAddToCartAction, IRemoveFromCartAction, IUpdateItemInCartAction, ICheckoutModeAction, IShopModeAction, IClearCartAction } from "./types";
import uuid from "uuid"

export function addToCartAction(cartItem: Omit<ICartItem, "id">) : IAddToCartAction {
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

export function clearCartAction() : IClearCartAction {
    return {
        type:CartActions.CLEAR_CART
    }
}