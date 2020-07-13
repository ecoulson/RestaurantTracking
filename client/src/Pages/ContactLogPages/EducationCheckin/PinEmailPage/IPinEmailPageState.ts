import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IPinEmailPageState {
    email: IFormValue<string>;
    send: boolean;
}