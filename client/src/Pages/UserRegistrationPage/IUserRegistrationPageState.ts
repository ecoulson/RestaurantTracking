import FormValue from "../../Components/FormInput/FormValue";
import ToastType from "../../Components/Toast/ToastType";

export default interface IUserRegistrationPageState {
    email: FormValue<string>;
    password: FormValue<string>;
    username: FormValue<string>;
    fullname: FormValue<string[]>;
    message: string;
    type : ToastType;
}