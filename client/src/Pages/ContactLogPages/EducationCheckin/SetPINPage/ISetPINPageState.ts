import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface ISetPINPageState {
    password: IFormValue<string>;
    organizationName: string;
    send: boolean;
    passwordInputType: number;
}