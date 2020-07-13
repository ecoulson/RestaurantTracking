import IPasswordRecoveryService from "./IPasswordRecoveryService";
import UserModel from "../../../models/user/UserModel";
import ITokenService from "../../Token/ITokenService";
import TokenService from "../../Token/TokenService";
import Scope from "../../Token/Scope";
import PasswordRecoveryEmail from "../../../lib/Email/PasswordRecoveryEmail"

export default class PasswordRecoveryService implements IPasswordRecoveryService {
    private tokenService : ITokenService;

    constructor() {
        this.tokenService = new TokenService([Scope.ResetPassword], 1);
    }

    async sendForgotPasswordEmail(email : string) {
        const user = await this.getUser(email);
        if (!user) {
            throw new Error(`No user with email ${email}`)
        }
        await this.tokenService.deleteExistingToken(user);
        const token = await this.tokenService.generate(user);
        const recoveryMessage = new PasswordRecoveryEmail(user, token);
        return await recoveryMessage.send();
    }

    private async getUser(email : string) {
        try {
            return await UserModel.findByEmail(email);
        } catch (error) {
            throw new Error(`Failed to find user with email ${email}`)
        }
    }
}