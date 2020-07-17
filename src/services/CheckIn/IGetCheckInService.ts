import ICheckIn from "../../models/CheckIn/ICheckIn";

export default interface IGetCheckInService {
    getCheckIn(checkInId: string) : Promise<ICheckIn>;
}