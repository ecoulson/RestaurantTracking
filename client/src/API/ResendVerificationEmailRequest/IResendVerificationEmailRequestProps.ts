import IRequestProps from "../IRequestProps";

export default interface IResendVerificationEmailRequestProps extends IRequestProps<{}> {
    email: string;
}