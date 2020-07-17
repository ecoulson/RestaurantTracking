import IUsernameAvailabilityService from "./IUsernameAvailabilityService";
import UserModel from "../../../models/User/UserModel";

export default class UsernameAvailabilityService implements IUsernameAvailabilityService {
    async check(username : string) {
        try {
            return await UserModel.findByUsername(username) === null;
        } catch (error) {
            throw new Error(`Failed to check username availability`);
        }
    }
}