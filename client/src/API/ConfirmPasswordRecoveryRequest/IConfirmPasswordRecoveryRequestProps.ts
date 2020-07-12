import IRequestProps from "../IRequestProps";

export default interface IConfirmPasswordRecoveryRequestProps extends IRequestProps<{}> {
    email: string;
    token: string;
}