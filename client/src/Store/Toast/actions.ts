import { ToastActions, IEnqueueToastAction, IDequeueToastAction, IDeleteToastAction, IRenderToastAction } from "./types";
import ToastType from "../../Components/Toast/ToastType";
import uuid from "uuid";

export function addToast(message: string, toastType: ToastType) : IEnqueueToastAction {
    return {
        type: ToastActions.ENQUEUE_TOAST,
        message,
        toastType,
        id: uuid.v1()
    }
}

export function removeToast(id: string) : IDequeueToastAction {
    return {
        type: ToastActions.DEQUEUE_TOAST,
        id
    }
}

export function deleteToast(id: string) : IDeleteToastAction {
    return {
        type: ToastActions.DELETE_TOAST,
        id
    }
}

export function renderToast(id: string) : IRenderToastAction {
    return {
        type: ToastActions.RENDER_TOAST,
        id
    }
}