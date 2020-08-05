import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IVerifyPINPageState {
    verificationCode: IFormValue<string>;
    send: boolean;
}