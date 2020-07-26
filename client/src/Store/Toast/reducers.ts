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
                    id: action.id
                })
            }
        case ToastActions.DEQUEUE_TOAST:
            return {
                messages: state.messages.filter((message) => message.id !== action.id)
            }
        default:
            return state;
    }
}
