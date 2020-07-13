import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IPINLoginPageState {
    organizationName: string;
    PIN: IFormValue<string>;
    send: boolean;
}