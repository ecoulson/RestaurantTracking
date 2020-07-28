import IFormValue from "../../../../../Components/FormInput/IFormValue";

export default interface IVerifyPINPageState {
    password: IFormValue<string>;
    send: boolean;
    shouldLogin: boolean;
}