import ToastType from "../../../Components/Toast/ToastType";
import FormValue from "../../../Components/FormInput/FormValue";

export default interface IUserPasswordChangeSectionState {
    currentPassword: string;
    newPassword: FormValue<string>;
}