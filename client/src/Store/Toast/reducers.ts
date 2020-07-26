import { IToast, ToastActionTypes, ToastActions } from "./types";

const initialState : IToast = {
    messages: [],
}

export function toastReducer(state = initialState, action : ToastActionTypes) {
    switch (action.type) {
        case ToastActions.ENQUEUE_TOAST:
            return {
                messages: state.messages.concat({
                    message: action.message,
                    toastType: action.toastType,
                    id: action.id,
                    showing: true,
                    rendered: false
                })
            }
        case ToastActions.DEQUEUE_TOAST:
            return {
                messages: state.messages.map((message) => {
                    if (message.id === action.id) {
                        message.showing = false
                    }
                    return message;
                })
            }
        case ToastActions.DELETE_TOAST:
            return {
                messages: state.messages.filter((message) => message.id !== action.id)
            }
        case ToastActions.RENDER_TOAST:
            return {
                messages: state.messages.map((message) => {
                    if (message.id === action.id) {
                        message.rendered = true
                    }
                    return message;
                })
            }
        default:
            return state;
    }
}
