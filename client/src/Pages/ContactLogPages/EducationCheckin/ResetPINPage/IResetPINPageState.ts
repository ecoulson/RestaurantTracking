import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IResetPINPageState {
    PIN: IFormValue<string>;
    organizationName: string;
    send: boolean;
}