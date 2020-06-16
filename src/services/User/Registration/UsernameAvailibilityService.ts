import IUsernameAvailibilityService from "./IUsernameAvailibilityService";
import UserModel from "../../../models/user/UserModel";

export default class UsernameAvailibilityService implements IUsernameAvailibilityService {
    async check(username : string) {
        try {
            return await UserModel.findByUsername(username) === null;
        } catch (error) {
            throw new Error(`Failed to check username availibility`);
        }
    }
}