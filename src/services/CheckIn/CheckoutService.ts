import ICheckoutService from "./ICheckoutService";
import CheckInBroker from "../../brokers/CheckInBroker";

export default class CheckoutService implements ICheckoutService {
    private checkInBroker : CheckInBroker;

    constructor(checkInBroker : CheckInBroker) {
        this.checkInBroker = checkInBroker;
    }

    async checkout(id: string) {
        const checkIn = await this.checkInBroker.getCheckInById(id);
        checkIn.checkedOut = true;
        checkIn.timeCheckedOut = new Date();
        await checkIn.save();
    }
}