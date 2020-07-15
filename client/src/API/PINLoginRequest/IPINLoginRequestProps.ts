import IRequestProps from "../IRequestProps";
import IPINLoginResponse from "./IPINLoginResponse";

export default interface IPINLoginRequestProps extends IRequestProps<IPINLoginResponse> {
    email: string;
    password: string;
    organizationId: string;
}