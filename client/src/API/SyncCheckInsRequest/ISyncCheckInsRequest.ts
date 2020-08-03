import IRequestProps from "../IRequestProps";
import ISyncCheckInsResponse from "./ISyncCheckInsResponse";

export default interface ISyncCheckInsRequest extends IRequestProps<ISyncCheckInsResponse> {
    organizationId: string;
    username: string;
    password: string;
}