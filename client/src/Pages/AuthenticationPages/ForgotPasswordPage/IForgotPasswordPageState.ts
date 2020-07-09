import ToastType from "../../../Components/Toast/ToastType";
import IFormValue from "../../../Components/FormInput/IFormValue";

export default interface IForgotPasswordPageState {
    email: IFormValue<string>;
    isRecovering: boolean;
}