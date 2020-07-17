import IRequestProps from "../IRequestProps";
import ICheckInResponse from "./ICheckInResponse";

export default interface ICheckInRequestProps extends IRequestProps<ICheckInResponse> {
    organizationId: string;
    building: string;
    timeCheckedIn: Date
}