import IUsernameAvailabilityService from "./IUsernameAvailabilityService";
import UserBroker from "../../../brokers/UserBroker";

export default class UsernameAvailabilityService implements IUsernameAvailabilityService {
    private userBroker : UserBroker;

    constructor(userBroker : UserBroker) {
        this.userBroker = userBroker
    }

    async check(username : string) {
        return (await this.userBroker.findUserByUsername(username)) !== null;
    }
}