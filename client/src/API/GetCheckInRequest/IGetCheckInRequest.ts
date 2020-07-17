import IRequestProps from "../IRequestProps";
import ICheckInResponse from "../CheckInRequest/ICheckInResponse";

export default interface IGetCheckInRequest extends IRequestProps<ICheckInResponse> {
    checkInId: string
}