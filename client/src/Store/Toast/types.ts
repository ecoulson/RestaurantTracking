import ToastType from "../../Components/Toast/ToastType";

export interface ToastMessage {
    message: string;
    toastType: ToastType;
    id: string;
    showing: boolean;
    rendered: boolean;
}

export interface IToast {
    messages: ToastMessage[];
}

export enum ToastActions {
    ENQUEUE_TOAST = "Enqueue_Toast",
    DEQUEUE_TOAST = "Dequeue_Toast",
    DELETE_TOAST = "Delete_Toast",
    RENDER_TOAST = "Render_Toast"
}

export interface IEnqueueToastAction {
    type: ToastActions.ENQUEUE_TOAST;
    message: string;
    toastType: ToastType;
    id: string;
}

export interface IRenderToastAction {
    type: ToastActions.RENDER_TOAST
    id: string
}

export interface IDequeueToastAction {
    type: ToastActions.DEQUEUE_TOAST
    id: string
}

export interface IDeleteToastAction {
    type: ToastActions.DELETE_TOAST
    id: string
}

export type ToastActionTypes = IEnqueueToastAction | IDequeueToastAction | IDeleteToastAction | IRenderToastAction