import IFormValue from "../../../../../Components/FormInput/IFormValue";

export default interface IPINEmailPageState {
    email: IFormValue<string>;
    send: boolean;
    register: boolean;
}