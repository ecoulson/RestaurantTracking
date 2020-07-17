import IRequestProps from "../IRequestProps";
import ICheckInResponse from "../CheckInRequest/ICheckInResponse";

export default interface ICheckoutRequestProps extends IRequestProps<ICheckInResponse> {
    checkInId: string;
}