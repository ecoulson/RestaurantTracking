import ISpamVerificationService from "./ISpamVerificationService";
import UserModel from "../../models/user/UserModel";
import IUser from "../../models/user/IUser";
import TokenModel from "../../models/token/TokenModel";
import Scope from "../Token/Scope";
import IToken from "../../models/token/IToken";
import SpamConfirmationEmail from "../../lib/Email/SpamConfirmationEmail";

export default class SpamVerificationService implements ISpamVerificationService {
    async cancelAccount(email: string, token: string) {
        const user = await this.getUser(email);
        this.ensureUserExists(user, email);
        this.ensureUserIsUnverified(user);
        const tokens = await this.getTokens(user);
        const verificationTokens = this.getVerificationsTokens(tokens);
        if (this.isEmpty(verificationTokens)) {
            throw new Error(`User with ${user.email} has no verification token`)
        }
        const verificationToken = verificationTokens[0];
        if (verificationToken.value !== token) {
            throw new Error(`Token values do not match`);
        }
        await this.removeVerificationToken(verificationToken, user);
        await this.removeUser(user);
        return await this.sendEmail(user);
    }

    private async getUser(email: string) {
        try {
            return await UserModel.findByEmail(email);
        } catch (error) {
            throw new Error(`Failed to find user with email ${email}`);
        }
    }

    private ensureUserExists(user : IUser, email: string) {
        if (!user) {
            throw new Error(`No user with email ${email}`);
        }
    }

    private ensureUserIsUnverified(user : IUser) {
        if (user.verified) {
            throw new Error(`User with email ${user.email} is already verified`)
        }
    }

    private async getTokens(user : IUser) {
        try {
            return await TokenModel.findByUserId(user.id);
        } catch (error) {
            throw new Error(`Error finding verification tokens for user email ${user.email}`)
        }
    }

    private getVerificationsTokens(tokens : IToken[]) {
        return tokens.filter((token) => {
            return token.scope.includes(Scope.VerifyEmail);
        });
    }

    private isEmpty(token : IToken[]) {
        return token.length === 0;
    }

    private async removeVerificationToken(token : IToken, user : IUser) {
        try {
            await token.remove();
        } catch (error) {
            throw new Error(`Failed to remove verification for user with ${user.email} from database`);
        }
    }

    private async removeUser(user : IUser) {
        try {
            await user.remove();
        } catch (error) {
            throw new Error(`Failed to remove user with ${user.email} from database`)
        }
    }

    private async sendEmail(user : IUser) {
        try {
            const spamEmail = new SpamConfirmationEmail(user.email);
            return await spamEmail.send();
        } catch (error) {
            throw new Error(`Failed to send spam verification email to ${user.email}`)
        }
    }
}