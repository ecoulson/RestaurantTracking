import IPasswordRecoveryService from "./IPasswordRecoveryService";
import ITokenService from "../../Token/ITokenService";
import UserBroker from "../../../brokers/UserBroker";
import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import Email from "../../Email/Email";
import IEmailMessage from "../../Email/IEmailMessage";

export default abstract class PasswordRecoveryService implements IPasswordRecoveryService {
    protected tokenService : ITokenService;
    private userBroker : UserBroker;

    constructor(tokenService : ITokenService) {
        this.tokenService = tokenService;
        this.userBroker = new UserBroker();
    }

    async sendForgotPasswordEmail(email : string, values : Map<string, string>) {
        const user = await this.userBroker.findUserByEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`)
        }
        await this.tokenService.deleteExistingToken(user);
        const token = await this.tokenService.generate(user, values);
        const recoveryMessage = new Email(await this.buildEmailMessage(user, token));
        return await recoveryMessage.send();
    }

    async abstract buildEmailMessage(user : IUser, token : IToken) : Promise<IEmailMessage>
}