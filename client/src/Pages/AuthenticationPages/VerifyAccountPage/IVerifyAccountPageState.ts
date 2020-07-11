import ToastType from "../../../Components/Toast/ToastType";
import IFormValue from "../../../Components/FormInput/IFormValue";

export default interface IVerifyAccountPageState {
    email: IFormValue<string>;
    send: boolean;
}