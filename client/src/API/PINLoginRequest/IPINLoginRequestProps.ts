import IRequestProps from "../IRequestProps";
import IPINLoginResponse from "./IPINLoginResponse";

export default interface IPINLoginRequestProps extends IRequestProps<IPINLoginResponse> {
    email: string;
    PIN: string;
    organizationId: string;
}