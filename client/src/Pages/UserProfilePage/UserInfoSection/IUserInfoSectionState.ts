import IFormValue from "../../../Components/FormInput/IFormValue";
import ToastType from "../../../Components/Toast/ToastType";

export default interface IUserInfoSectionState {
    email: IFormValue<string>;
    username: IFormValue<string>;
    fullName: IFormValue<string[]>;
    registering: boolean;
    message: string;
    type: ToastType;
}