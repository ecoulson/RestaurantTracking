import ICancelPasswordRecoveryService from "./ICancelPasswordRecoveryService";
import UserModel from "../../models/user/UserModel";
import TokenModel from "../../models/token/TokenModel";
import Scope from "../Token/Scope";
import IToken from "../../models/token/IToken";
import IUser from "../../models/user/IUser";

export default class CancelPasswordRecoveryService implements ICancelPasswordRecoveryService {
    async cancel(email : string, token : string) {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`);
        }
        const tokens = await this.findTokensByUserId(user);
        const recoverPasswordToken = this.getPasswordResetToken(tokens);
        if (!recoverPasswordToken) {
            throw new Error(`No recovery password token associated with ${user._id}`);
        }
        await this.removeRecoverPasswordToken(recoverPasswordToken);
        return true;
    }

    private async findUserByEmail(email : string) {
        try {
            return await UserModel.findByEmail(email);
        } catch (error) {
            throw new Error(`Failed to find user with email ${email}`);
        }
    }

    private async findTokensByUserId(user : IUser) {
        try {
            return await TokenModel.findByUserId(user.id);
        } catch (error) {
            throw new Error(`Failed to find tokens by user id ${user.id}`);
        }
    }

    private async removeRecoverPasswordToken(token : IToken) {
        try {
            await token.remove();
        } catch (error) {
            throw new Error(`Failed to remove recovery password token ${token._id}`)
        }
    }

    private getPasswordResetToken(tokens : IToken[]) {
        return tokens.filter((token) => {
            return token.scope.includes(Scope.ResetPassword)
        })[0];
    }
}