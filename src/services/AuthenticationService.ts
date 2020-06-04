import IAuthenticationService from "./IAuthenticationService";
import UserModel from "../models/user/UserModel";
import IUser from "../models/user/IUser";
import bcrypt from "bcrypt";

export default class AuthenticationService implements IAuthenticationService {
    async login(username: string, password: string) {
        const user = await this.getUser(username);
        if (!user) {
            throw new Error(`No user with username ${username}`);
        }
        if (!await this.isCorrectPassword(user, password)) {
            throw new Error(`Loggin for ${user._id} failed because passwords did not match`);
        }
        return user;
    }

    private async getUser(username : string) {
        try {
            return await UserModel.findByUsername(username);
        } catch(error) {
            throw new Error(`Error occured while finding ${username}`);
        }
    }

    private async isCorrectPassword(user : IUser, password : string) {
        try {
            return await bcrypt.compare(password, user.password);
        } catch (error) {
            throw new Error(
                `Error occured while comparing password for user with id ${user._id}`
            )
        }
    }
}