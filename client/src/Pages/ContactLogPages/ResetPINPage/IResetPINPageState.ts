import IFormValue from "../../../Components/FormInput/IFormValue";

export default interface IResetPINPageState {
    password: IFormValue<string>;
    passwordInputType: number;
    organizationName: string;
    send: boolean;
}