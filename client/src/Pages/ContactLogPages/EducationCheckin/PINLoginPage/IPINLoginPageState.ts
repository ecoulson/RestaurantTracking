import IFormValue from "../../../../Components/FormInput/IFormValue";

export default interface IPINLoginPageState {
    organizationName: string;
    password: IFormValue<string>;
    passwordInputType: number;
    send: boolean;
}