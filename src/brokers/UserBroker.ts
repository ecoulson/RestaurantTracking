import UserModel from "../models/user/UserModel";

export default class UserBroker {
    async findUserByEmail(email : string) {
        try {
            return UserModel.findByEmail(email);
        } catch (error) {
            throw error;
        }
    }
}