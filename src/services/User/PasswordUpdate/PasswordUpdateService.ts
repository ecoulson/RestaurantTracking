import IPasswordUpdateService from "./IPasswordUpdateService";
import IUser from "../../../models/User/IUser";
import bcrypt from "bcrypt"

export default class PasswordUpdateService implements IPasswordUpdateService {
    async updatePassword(user : IUser, currentPassword : string, newPassword : string) {
        if (await bcrypt.compare(currentPassword, user.password)) {
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
        } else {
            throw new Error("Failed to update user password")
        }
    }
}