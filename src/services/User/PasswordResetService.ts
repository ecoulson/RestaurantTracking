import IPasswordResetService from "./IPasswordResetService";
import UserModel from "../../models/user/UserModel";

export default class PasswordResetService implements IPasswordResetService {
    async reset(userId: string, newPassword : string) {
        try {
            await UserModel.findById(userId);
        } catch (error) {
            throw new Error(`Failed to find user with id ${userId}`);
        }
    }
}