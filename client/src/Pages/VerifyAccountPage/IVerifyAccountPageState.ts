import ToastType from "../../Components/Toast/ToastType";

export default interface IVerifyAccountPageState {
    email: string;
    canSubmit: boolean;
    message: string;
    type: ToastType;
}