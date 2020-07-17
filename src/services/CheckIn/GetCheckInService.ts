import IGetCheckInService from "./IGetCheckInService";
import CheckInBroker from "../../brokers/CheckInBroker";

export default class GetCheckInService implements IGetCheckInService {
    private checkInBroker : CheckInBroker;

    constructor(checkInBroker : CheckInBroker) {
        this.checkInBroker = checkInBroker
    }

    async getCheckIn(id: string) {
        return await this.checkInBroker.getCheckInById(id);
    }    
}