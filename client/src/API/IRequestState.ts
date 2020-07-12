import ToastType from "../Components/Toast/ToastType";

export default interface IRequestState {
    message: string;
    type: ToastType;
    unMounting: boolean;
    completed: boolean;
}