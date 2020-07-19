import IAuthenticationService from "./IAuthenticationService";
import UserModel from "../../models/User/UserModel";
import IUser from "../../models/User/IUser";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import LoginArguments from "./LoginArguments";

export default class AuthenticationService implements IAuthenticationService {
    async login(parameters : LoginArguments) {
        const { username, password } = parameters;
        const user = await this.getUser(username);
        this.ensureUserExists(user, username);
        await this.checkPassword(user, password);
        return user;
    }

    private async getUser(username : string) {
        try {
            return await UserModel.findByUsername(username);
        } catch(error) {
            throw new Error(`Error ocurred while finding ${username}`);
        }
    }

    private ensureUserExists(user : IUser, username: string) {
        if (!user) {
            throw new Error(`No user with username ${username}`);
        }
    }

    private async checkPassword(user : IUser, password : string) {
        if (!await this.isCorrectPassword(user, password)) {
            throw new Error(`Login for ${user._id} failed because passwords did not match`);
        }
    }

    private async isCorrectPassword(user : IUser, password : string) {
        try {
            return await bcrypt.compare(password, user.password);
        } catch (error) {
            throw new Error(
                `Error ocurred while comparing password for user with id ${user._id}`
            )
        }
    }

    public generateAccessToken(user : IUser, rememberMe: boolean) {
        try {
            return jsonwebtoken.sign({
                _id: user._id,
            }, process.env.ACCESS_TOKEN_SECRET, this.getOptions(rememberMe));
        } catch (error) {
            throw new Error(`Failed to generate access token for user id ${user._id}`)
        }
    }

    private getOptions(rememberMe : boolean) : jsonwebtoken.SignOptions {
        if (!rememberMe) {
            return {
                expiresIn: '1d',
            }
        } else {
            return {};
        }
    }
}