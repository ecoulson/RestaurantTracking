import UserModel from "../models/user/UserModel";
import IUser from "../models/user/IUser";

export default class UserBroker {
    async findUserByEmail(email : string) {
        try {
            return await UserModel.findByEmail(email);
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

    async findUserByUsername(username: string) {
        try {
            return await UserModel.findByUsername(username);
        } catch (error) {
            throw error;
        }
    }

    async save(user : IUser) {
        try {
            return await user.save();
        } catch (error) {
            throw new Error(`Failed to save user with username ${user.username} to the database`);
        }
    }
}