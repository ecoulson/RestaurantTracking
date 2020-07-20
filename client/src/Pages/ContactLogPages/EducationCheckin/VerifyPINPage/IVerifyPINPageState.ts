import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IVerifyPINPageState {
    password: IFormValue<string>;
    organizationName: string;
    send: boolean;
    shouldLogin: boolean;
}