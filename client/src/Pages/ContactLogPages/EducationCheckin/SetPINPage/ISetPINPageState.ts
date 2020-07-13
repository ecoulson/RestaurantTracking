import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface ISetPINPageState {
    PIN: IFormValue<string>;
    organizationName: string;
    send: boolean;
}