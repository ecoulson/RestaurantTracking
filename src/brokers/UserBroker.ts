import UserModel from "../models/User/UserModel";
import IUser from "../models/User/IUser";
import bcrypt from "bcrypt";

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

    async save(user : IUser) {
        try {
            return await user.save();
        } catch (error) {
            throw new Error(`Failed to save user with username ${user.username} to the database`);
        }
    }

    async createUser(userParams: {
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName?: string,
        number?: string,
        anonymous?: boolean
    }) {
        try {
            return new UserModel({
                username: userParams.username,
                email: userParams.email,
                password: await bcrypt.hash(userParams.password, 10),
                firstName: userParams.firstName,
                lastName: userParams.lastName,
                number: userParams.number,
                anonymous: userParams.anonymous ? userParams.anonymous : false
            })
        } catch (error) {
            throw error;
        }
    }

    async delete(user : IUser) {
        try {
            return await user.remove()
        } catch (error) {
            throw error;
        }
    }
}