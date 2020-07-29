import { ICart, CartActionTypes, CartActions } from "./types";
import { act } from "react-dom/test-utils";

const initialState : ICart = {
    items: []
}

export function cartReducer(state = initialState, action : CartActionTypes) {
    switch (action.type) {
        case CartActions.ADD:
            return {
                items: [...state.items, action.cartItem]
            }
        case CartActions.REMOVE:
            return {
                items: state.items.filter((item) => {
                    return item.id !== action.id;
                })
            }
        case CartActions.UPDATE:
            return {
                items: state.items.map((item) => {
                    return {
                        name: action.name ? action.name : item.name,
                        description: action.description ? action.description : item.description,
                        price: action.price ? action.price : item.price,
                        productImage: action.productImage ? action.productImage : item.productImage,
                        quantity: action.quantity ? action.quantity : item.quantity
                    }
                })
            }
        default:
            return state;
    }
}
