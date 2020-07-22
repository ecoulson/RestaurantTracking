import UserModel from "../models/User/UserModel";
import IUser from "../models/User/IUser";

export default class UserBroker {
    async findById(id: string) {
        try {
            return await UserModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

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

    async find

    async save(user : IUser) {
        try {
            return await user.save();
        } catch (error) {
            throw new Error(`Failed to save user with username ${user.username} to the database`);
        }
    }
}