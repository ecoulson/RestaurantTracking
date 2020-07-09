import IRequestProps from "../IRequestProps";

export default interface IResetPasswordRequestProps extends IRequestProps<{}> {
    email: string;
    token: string;
    password: string;
}