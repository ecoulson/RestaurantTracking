import IPasswordResetService from "./IPasswordResetService";
import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import Scope from "../../Token/Scope";
import bcrypt from "bcrypt"
import UserBroker from "../../../brokers/UserBroker";
import TokenBroker from "../../../brokers/TokenBroker";

export default class PasswordResetService implements IPasswordResetService {
    private hour = 1 * 60 * 60 * 1000;
    private userBroker : UserBroker;
    private tokenBroker : TokenBroker;

    constructor(userBroker : UserBroker, tokenBroker : TokenBroker) {
        this.userBroker = userBroker;
        this.tokenBroker = tokenBroker
    }

    async reset(email: string, newPassword : string, token : string) {
        const user = await this.userBroker.findUserByEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`)
        }
        const tokens = await this.tokenBroker.getTokens(user);
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
        await this.tokenBroker.remove(passwordResetToken);
        await this.userBroker.save(user);
        return user;
    }

    private getPasswordResetTokens(tokens : IToken[]) {
        return tokens.filter((token) => {
            return token.scope.includes(Scope.ResetPassword);
        })
    }

    private isExpired(user : IUser) {
        return Math.abs(new Date().valueOf() - user.passwordResetDate.valueOf()) > this.hour;
    }
}