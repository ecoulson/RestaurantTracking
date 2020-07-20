import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IPINEmailPageState {
    organizationName: string;
    email: IFormValue<string>;
    send: boolean;
    register: boolean;
}