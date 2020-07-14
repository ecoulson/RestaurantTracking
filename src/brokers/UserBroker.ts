import UserModel from "../models/user/UserModel";
import IUser from "../models/user/IUser";

export default class UserBroker {
    async findUserByEmail(email : string) {
        try {
            return UserModel.findByEmail(email);
        } catch (error) {
            throw error;
        }
    }

    async removeUser(user : IUser) {
        try {
            await user.remove();
        } catch (error) {
            throw error;
        }
    }
}