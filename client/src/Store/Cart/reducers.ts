import { ICart, CartActionTypes, CartActions } from "./types";

const initialState : ICart = {
    items: [],
    isCheckingOut: false
}

export function cartReducer(state = initialState, action : CartActionTypes) {
    switch (action.type) {
        case CartActions.ADD:
            return {
                ...state,
                items: [...state.items, action.cartItem]
            }
        case CartActions.REMOVE:
            return {
                ...state,
                items: state.items.filter((item) => {
                    return item.id !== action.id;
                })
            }
        case CartActions.UPDATE:
            return {
                ...state,
                items: state.items.map((item) => {
                    return {
                        ...item,
                        name: action.name ? action.name : item.name,
                        description: action.description ? action.description : item.description,
                        price: action.price ? action.price : item.price,
                        productImage: action.productImage ? action.productImage : item.productImage,
                        quantity: action.quantity ? action.quantity : item.quantity
                    }
                })
            }
        case CartActions.CHECKOUT_MODE:
            return {
                ...state,
                isCheckingOut: true
            }
        case CartActions.SHOP_MODE:
            return {
                ...state,
                isCheckingOut: false
            }
        default:
            return state;
    }
}
