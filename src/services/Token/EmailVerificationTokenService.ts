import IUser from "../../models/user/IUser";
import crypto from "crypto"
import TokenModel from "../../models/token/TokenModel";
import IToken from "../../models/token/IToken";
import Scope from "./Scope";
import IEmailVerificationTokenService from "./IEmailVerificationTokenService";

const NumberOfBytes = 38

export default class EmailVerificationTokenService implements IEmailVerificationTokenService {
    async generate(user : IUser) {
        const createdAt = new Date();
        const expirationDate = new Date(createdAt.valueOf());
        expirationDate.setDate(createdAt.getDate() + 1);
        const token = new TokenModel({
            userId: user._id,
            value: this.getRandomBytes(user._id),
            scope: [Scope.VerifyEmail],
            createdAt: createdAt,
            updatedAt: createdAt,
            expiresAt: expirationDate
        });
        await this.saveToken(token);
        return token;
    }

    private getRandomBytes(userId : string) {
        try {
            return crypto.randomBytes(NumberOfBytes).toString("hex");
        } catch {
            throw new Error(`Failed to generate email verification token for ${userId}`)
        }
    }

    private async saveToken(token : IToken) {
        try {
            return await token.save();
        } catch (error) {
            throw new Error(`Failed to save email verification token to database for ${token.userId}`)
        }
    }

    async deleteExisitingVerificationToken(user : IUser) {
        const tokens = await this.getUsersTokens(user);
        if (this.userHasTokens(tokens)) {
            return null;
        }
        const verificationToken = this.getVerificationToken(tokens);
        if (!verificationToken) {
            return null;
        }
        await this.removeVerificationToken(verificationToken);
        return verificationToken;
    }

    private async getUsersTokens(user : IUser) {
        try {
            return await TokenModel.findByUserId(user._id);
        } catch (error) {
            throw new Error(`Failed to find tokens associatied with user ${user._id}`);
        }
    }

    private userHasTokens(tokens : IToken[]) {
        return tokens.length === 0;
    }

    private getVerificationToken(tokens : IToken[]) {
        for (let token of tokens) {
            for (let scope of token.scope) {
                if (scope === Scope.VerifyEmail) {
                    return token;
                }
            }
        }
        return null;
    }

    private async removeVerificationToken(token : IToken) {
        try {
            await token.remove()
        } catch (error) {
            throw new Error(`Failed to remove token with id ${token._id}`);
        }
    }
}