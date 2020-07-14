import IPasswordRecoveryService from "./IPasswordRecoveryService";
import ITokenService from "../../Token/ITokenService";
import TokenService from "../../Token/TokenService";
import Scope from "../../Token/Scope";
import UserBroker from "../../../brokers/UserBroker";
import EmailMessageBuilder from "../../../lib/Email/EmailMessageBuilder";
import IUser from "../../../models/user/IUser";
import InternalURLBuilder from "../../../lib/URL/InternalURLBuilder";
import IToken from "../../../models/token/IToken";
import Email from "../../../lib/Email/Email";

export default class PasswordRecoveryService implements IPasswordRecoveryService {
    private tokenService : ITokenService;
    private userBroker : UserBroker;

    constructor() {
        this.tokenService = new TokenService([Scope.ResetPassword], 1);
        this.userBroker = new UserBroker();
    }

    async sendForgotPasswordEmail(email : string) {
        const user = await this.userBroker.findUserByEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`)
        }
        await this.tokenService.deleteExistingToken(user);
        const token = await this.tokenService.generate(user);
        const recoveryMessage = new Email(this.buildEmailMessage(user, token));
        return await recoveryMessage.send();
    }

    private buildEmailMessage(user : IUser, token : IToken) {
        const internalURLBuilder = new InternalURLBuilder();
        return new EmailMessageBuilder()
            .setTo(user.email)
            .setFrom("support@adaptsolutions.tech")
            .setTemplateId("d-e0f9185e8da44ed0a7dd653e45fe06f6")
            .setData({
                resetPasswordUrl: internalURLBuilder.build(`confirm-recover?email=${user.email}&token=${token.value}`),
                alertUrl: internalURLBuilder.build(`cancel-recover?email=${user.email}&token=${token.value}`)
            })
    }
}