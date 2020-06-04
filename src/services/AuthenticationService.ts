import IAuthenticationService from "./IAuthenticationService";
import UserModel from "../models/user/UserModel";
import IUser from "../models/user/IUser";

export default class AuthenticationService implements IAuthenticationService {
    async login(username: string, password: string) {
        const user = await this.getUser(username);
        if (!user) {
            throw new Error(`No user with username ${username}`);
        }
        return {} as IUser;
    }

    private async getUser(username : string) {
        try {
            return await UserModel.findByUsername(username);
        } catch(error) {
            throw new Error(`Error occured while finding ${username}`);
        }
    }
}