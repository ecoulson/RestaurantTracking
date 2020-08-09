import IGetCheckInService from "./IGetCheckInService";
import CheckInBroker from "../../brokers/CheckInBroker";

export default class GetCheckInService implements IGetCheckInService {
    private checkInBroker : CheckInBroker;

    constructor(checkInBroker : CheckInBroker) {
        this.checkInBroker = checkInBroker
    }

    async getCheckIn(id: string) {
        const checkIn = await this.checkInBroker.getCheckInById(id);
        if (!checkIn) {
            throw new Error(`No check in with id: ${id}`)
        }
        return checkIn;
    }    
}