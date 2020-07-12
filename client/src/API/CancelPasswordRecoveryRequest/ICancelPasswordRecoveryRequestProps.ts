import IRequestProps from "../IRequestProps";

export default interface ICancelPasswordRecoveryRequestProps extends IRequestProps<{}> {
    email: string;
    token: string;
}