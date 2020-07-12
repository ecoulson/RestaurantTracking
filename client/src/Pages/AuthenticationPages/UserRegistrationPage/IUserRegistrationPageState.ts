import FormValue from "../../../Components/FormInput/FormValue";

export default interface IUserRegistrationPageState {
    email: FormValue<string>;
    password: FormValue<string>;
    username: FormValue<string>;
    fullName: FormValue<string[]>;
    send: boolean;
}