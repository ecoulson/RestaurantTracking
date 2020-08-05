import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IPINLoginPageState {
    password: IFormValue<string>;
    passwordInputType: number;
    send: boolean;
}