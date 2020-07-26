import ToastType from "../../Components/Toast/ToastType";

export interface ToastMessage {
    message: string;
    toastType: ToastType;
    id: string;
}

export interface IToast {
    messages: ToastMessage[];
}

export enum ToastActions {
    ENQUEUE_TOAST = "Enqueue_Toast",
    DEQUEUE_TOAST = "Dequeue_Toast",
}

export interface IEnqueueToastAction {
    type: ToastActions.ENQUEUE_TOAST;
    message: string;
    toastType: ToastType;
    id: string;
}

export interface IDequeueToastAction {
    type: ToastActions.DEQUEUE_TOAST
    id: string
}

export type ToastActionTypes = IEnqueueToastAction | IDequeueToastAction