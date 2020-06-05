import IUserService from "./IUserService";
import IRegistrationBody from "../../controllers/User/IRegistrationBody";
import UserModel from "../../models/user/UserModel";
import bcrypt from "bcrypt";
import EmailVerificationTokenService from "../Token/EmailVerificationTokenService";
import IEmailVerificationTokenService from "../Token/IEmailVerificationTokenService";
import VerificationEmail from "../../lib/Email/VerificationEmail";

export default class UserService implements IUserService {
    private emailVerificationTokenService : IEmailVerificationTokenService;

    constructor() {
        this.emailVerificationTokenService = new EmailVerificationTokenService();
    }

    async register(registration : IRegistrationBody) {
        const user = new UserModel(await this.getUserDocument(registration));
        if (await this.isUsernameTaken(user.username)) {
            throw new Error(`Username ${user.username} already exists`);
        }
        if (await this.isEmailTaken(user.email)) {
            throw new Error(`Email ${user.email} is associated with another account`)
        }
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

    private async isUsernameTaken(username : string) {
        try {
            return await UserModel.findByUsername(username) !== null;
        } catch (error) {
            throw new Error(`Failed to check if username ${username} already exists`)
        }
    }

    private async isEmailTaken(email : string) {
        try {
            return await UserModel.findByEmail(email) !== null;
        } catch (error) {
            throw new Error(`Failed to check if email ${email} already exists`)
        }
    }

    async sendVerificationEmail(email : string) {
        const user = await this.findUserWithEmail(email);
        await this.emailVerificationTokenService.deleteExisitingVerificationToken(user);
        const token = await this.emailVerificationTokenService.generate(user);
        try {
            return await new VerificationEmail().send(token, user);
        } catch(error) {
            throw new Error(`Failed to send email for ${email}`);
        }
    }

    private async findUserWithEmail(email: string) {
        try {
            return await UserModel.findByEmail(email);
        } catch(error) {
            throw new Error(`Failed to find user with email ${email}`);
        }
    }

    async sendForgotPasswordEmail(email : string) {

    }
}