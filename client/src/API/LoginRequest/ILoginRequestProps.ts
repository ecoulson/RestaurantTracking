import ILoginResponse from "./ILoginResponse";
import IRequestProps from "../IRequestProps";

export default interface ILoginRequestProps extends IRequestProps<ILoginResponse> {
    username: string;
    password: string;
    rememberMe: boolean;
}