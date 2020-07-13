import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IVerifyPINAccountPageState {
    organizationName: string;
    send: boolean;
    email: IFormValue<string>;
}