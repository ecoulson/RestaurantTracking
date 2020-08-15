import IPasswordUpdateService from "./IPasswordUpdateService";
import IUser from "../../../models/User/IUser";
import bcrypt from "bcrypt"
import UserBroker from "../../../brokers/UserBroker";

export default class PasswordUpdateService implements IPasswordUpdateService {
    private userBroker : UserBroker;

    constructor(userBroker : UserBroker) {
        this.userBroker = userBroker;
    }

    async updatePassword(user : IUser, currentPassword : string, newPassword : string) {
        if (await bcrypt.compare(currentPassword, user.password)) {
            user.password = await bcrypt.hash(newPassword, 10);
            return await this.userBroker.save(user);
        } else {
            throw new Error("Failed to update user password")
        }
    }
}