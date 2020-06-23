import IPasswordResetService from "./IPasswordResetService";
import UserModel from "../../../models/user/UserModel";
import TokenModel from "../../../models/token/TokenModel";
import IUser from "../../../models/user/IUser";
import IToken from "../../../models/token/IToken";
import Scope from "../../Token/Scope";
import bcrypt from "bcrypt"

export default class PasswordResetService implements IPasswordResetService {
    private hour = 1 * 60 * 60 * 1000;

    async reset(email: string, newPassword : string, token : string) {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`)
        }
        const tokens = await this.findUserTokens(user);
        const passwordResetTokens = this.getPasswordResetTokens(tokens);
        if (passwordResetTokens.length === 0) {
            throw new Error(`No password reset token associated with ${user.email}`)
        }
        const passwordResetToken = passwordResetTokens[0];
        if (passwordResetToken.value !== token) {
            throw new Error("Tokens do not match");
        }
        if (this.isExpired(user)) {
            throw new Error("Password reset window has expired")
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await this.removeToken(passwordResetToken);
        await this.updateUser(user);
        return user;
    }

    private async findUserByEmail(email : string) {
        try {
            return await UserModel.findByEmail(email);
        } catch (error) {
            throw new Error(`Failed to find user with email ${email}`);
        }
    }

    private async findUserTokens(user : IUser) {
        try {
            return await TokenModel.findByUserId(user._id);
        } catch (error) {
            throw new Error(`Failed to find recovery associated user with email ${user.email}`);
        }
    }

    private getPasswordResetTokens(tokens : IToken[]) {
        return tokens.filter((token) => {
            return token.scope.includes(Scope.ResetPassword);
        })
    }

    private isExpired(user : IUser) {
        return Math.abs(new Date().valueOf() - user.passwordResetDate.valueOf()) > this.hour;
    }

    private async removeToken(token : IToken) {
        try {
            await token.remove();
        } catch (error) {
            throw new Error(`Failed to remove token with id ${token._id}`)
        }
    }

    private async updateUser(user : IUser) {
        try {
            await user.save();
        } catch (error) {
            throw new Error(`Failed to save updated user with id ${user._id}`)
        }
    }
}