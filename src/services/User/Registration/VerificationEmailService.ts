import IVerificationEmailService from "./IVerificationEmailService";
import TokenService from "../../Token/TokenService";
import VerificationEmail from "../../../lib/Email/VerificationEmail";
import IVerificationEmailData from "../../../lib/Email/IVerificationEmailData";
import UserModel from "../../../models/user/UserModel";
import IEmail from "../../../lib/Email/IEmail";
import Scope from "../../Token/Scope";
import ITokenSerivce from "../../Token/ITokenService";

export default class VerificationEmailService implements IVerificationEmailService {
    private accessTokenService : ITokenSerivce;

    constructor() {
        this.accessTokenService = new TokenService([Scope.VerifyEmail], 24);
    }

    async sendVerificationEmail(email : string) {
        const user = await this.findUserWithEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`)
        }
        if (user.verified) {
            throw new Error(`User with email ${email} is already verified`)
        }
        await this.accessTokenService.deleteExisitingToken(user);
        const token = await this.accessTokenService.generate(user);
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