import IUserService from "./IUserService";
import IRegistrationBody from "../controllers/User/IRegistrationBody";
import UserModel from "../models/user/UserModel";
import bcrypt from "bcrypt";

export default class UserService implements IUserService {
    async register(registration : IRegistrationBody) {
        const user = new UserModel(await this.getUserDocument(registration));
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new Error(`Failed to save user with username ${registration.username} to the database`);
        }
    }

    private async getUserDocument(registration : IRegistrationBody) {
        try {
            return {
                firstName: registration.firstName,
                lastName: registration.lastName,
                email: registration.email,
                username: registration.username,
                password: await bcrypt.hash(registration.password, 10)
            };
        } catch (error) {
            throw new Error(`Failed to hash password for registering user ${registration.username}`)
        }
    }

    async sendVerificationEmail(email : string) {
        
    }

    async sendForgotPasswordEmail(email : string) {

    }
}