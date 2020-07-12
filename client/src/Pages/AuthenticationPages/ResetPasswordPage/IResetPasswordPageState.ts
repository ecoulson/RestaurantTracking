import IFormValue from "../../../Components/FormInput/IFormValue";
import ToastType from "../../../Components/Toast/ToastType";

export default interface IResetPasswordPageState { 
    password: IFormValue<string>;
    send: boolean;
}