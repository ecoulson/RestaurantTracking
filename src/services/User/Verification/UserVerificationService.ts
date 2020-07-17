import IUserVerificationService from "./IUserVerificationService";
import IUser from "../../../models/User/IUser";
import TokenModel from "../../../models/Token/TokenModel";
import Scope from "../../Token/Scope";
import IToken from "../../../models/Token/IToken";
import UserModel from "../../../models/User/UserModel";

export default class UserVerificationService implements IUserVerificationService {
    async verify(token: string, email : string) {
        const user = await this.findUserToVerify(email);
        const verificationToken = await this.getUserVerificationToken(user);
        this.verifyVerificationToken(token, verificationToken);
        const verifiedUser = await this.verifyUser(user);
        await this.removeVerifictionToken(verificationToken, user);
        return verifiedUser;
    }

    private async findUserToVerify(email : string) {
        const user = await this.findUserWithEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`);
        }
        if (user.verified) {
            throw new Error(`User with email ${email} is already verified`);
        }
        return user;
    }

    private async findUserTokens(user : IUser) {
        try {
            return await TokenModel.findByUserId(user._id);
        } catch (error) {
            throw new Error(`Failed to find tokens associated with user ${user._id}`)
        }
    }

    private async getUserVerificationToken(user : IUser) {
        const tokens = await this.findUserTokens(user);
        const verificationTokens = this.findTokensWithScope(tokens, Scope.VerifyEmail);
        if (this.isEmpty(verificationTokens)) {
            throw new Error(`User ${user._id} has no active email verification tokens`)
        }
        return verificationTokens[0];
    }

    private findTokensWithScope(tokens : IToken[], scopeType : Scope) {
        return tokens.filter((token : IToken) => {
            return token.scope.includes(scopeType);
        })
    }

    private isEmpty(array : any[]) {
        return array.length === 0;
    }

    private verifyVerificationToken(providedToken : string, token : IToken) {
        if (token.value !== providedToken) {
            throw new Error("Incorrect verification token provided")
        }
    }

    private async removeVerifictionToken(verificationToken : IToken, user : IUser) {
        try {
            await verificationToken.remove();
        } catch (error) {
            throw new Error(`Failed to delete verification token for user ${user._id}`)
        }
    }

    private async verifyUser(user : IUser) {
        try {
            user.verified = true;
            await user.save();
        } catch (error) {
            throw new Error(`Failed to update verification status of user ${user._id}`);
        }
        return user;
    }

    private async findUserWithEmail(email: string) {
        try {
            return await UserModel.findByEmail(email);
        } catch(error) {
            throw new Error(`Failed to find user with email ${email}`);
        }
    }
}
