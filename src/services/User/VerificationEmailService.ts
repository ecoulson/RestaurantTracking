import IVerificationEmailService from "./IVerificationEmailService";
import IEmailVerificationTokenService from "../Token/IEmailVerificationTokenService";
import EmailVerificationTokenService from "../Token/EmailVerificationTokenService";
import VerificationEmail from "../../lib/Email/VerificationEmail";
import IVerificationEmailData from "../../lib/Email/IVerificationEmailData";
import UserModel from "../../models/user/UserModel";
import IEmail from "../../lib/Email/IEmail";

export default class VerificationEmailService implements IVerificationEmailService {
    private emailVerificationTokenService : IEmailVerificationTokenService;

    constructor() {
        this.emailVerificationTokenService = new EmailVerificationTokenService();
    }

    async sendVerificationEmail(email : string) {
        const user = await this.findUserWithEmail(email);
        await this.emailVerificationTokenService.deleteExisitingVerificationToken(user);
        const token = await this.emailVerificationTokenService.generate(user);
        return await this.sendEmail(new VerificationEmail(user, token)) as IVerificationEmailData;
    }

    private async findUserWithEmail(email: string) {
        try {
            return await UserModel.findByEmail(email);
        } catch(error) {
            throw new Error(`Failed to find user with email ${email}`);
        }
    }

    private async sendEmail(email : IEmail) {
        try {
            return await email.send();
        } catch(error) {
            throw new Error(`Failed to send email to ${email.getAddress()}`);
        }
    }
}