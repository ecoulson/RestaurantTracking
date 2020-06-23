import IPasswordRecoveryConfirmationService from "./IPasswordRecoveryConfirmationService";
import UserModel from "../../../models/user/UserModel";
import TokenModel from "../../../models/token/TokenModel";
import IUser from "../../../models/user/IUser";
import IToken from "../../../models/token/IToken";
import Scope from "../../Token/Scope";

export default class PasswordRecoveryConfirmationService implements IPasswordRecoveryConfirmationService {
    async confirm(email: string, token : string) {
        const user = await this.findUserByEmail(email); 
        if (!user) {
            throw new Error(`No user with email ${email}`);
        }
        const tokens = await this.findUserTokens(user);
        const resetTokens = this.getPasswordRecoveryTokens(tokens);
        if (resetTokens.length === 0) {
            throw new Error(`No password reset tokens associated with user ${user._id}`)
        }
        const resetToken = resetTokens[0];
        await this.setPasswordRecoverDate(user);
        return resetToken.value === token;
    }

    private async findUserByEmail(email : string) {
        try {
            return await UserModel.findByEmail(email);
        } catch (error) {
            throw new Error(`Failed to find user by email ${email}`);
        }
    }

    private async findUserTokens(user : IUser) {
        try {
            return await TokenModel.findByUserId(user._id);
        } catch (error) {
            throw new Error(`Failed to find tokens for user with id ${user._id}`)
        }
    }

    private getPasswordRecoveryTokens(tokens : IToken[]) {
        return tokens.filter((token) => {
            return token.scope.includes(Scope.ResetPassword)
        })
    }

    private async setPasswordRecoverDate(user : IUser) {
        try {
            user.passwordResetDate = new Date();
            await user.save();
        } catch (error) {
            throw new Error(`Failed to update user ${user._id}'s password reset date`);
        }
    }
}