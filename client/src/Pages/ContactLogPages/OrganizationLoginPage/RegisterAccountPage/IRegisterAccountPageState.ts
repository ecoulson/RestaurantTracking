import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IRegisterAccountPageState {
    password: IFormValue<string>;
    username: IFormValue<string>;
    email: IFormValue<string>;
    fullName: IFormValue<string[]>
    shouldRegisterUser: boolean;
    shouldLogin: boolean;
}