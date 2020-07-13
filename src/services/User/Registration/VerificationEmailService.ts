import IVerificationEmailService from "./IVerificationEmailService";
import TokenService from "../../Token/TokenService";
import VerificationEmail from "../../../lib/Email/VerificationEmail";
import IVerificationEmailData from "../../../lib/Email/IVerificationEmailData";
import Scope from "../../Token/Scope";
import ITokenService from "../../Token/ITokenService";
import UserBroker from "../../../brokers/UserBroker";
import EmailBroker from "../../../brokers/EmailBroker";

export default class VerificationEmailService implements IVerificationEmailService {
    private accessTokenService : ITokenService;
    private userBroker : UserBroker;
    private emailBroker : EmailBroker<IVerificationEmailData>;

    constructor() {
        this.accessTokenService = new TokenService([Scope.VerifyEmail], 24);
        this.userBroker = new UserBroker();
        this.emailBroker = new EmailBroker<IVerificationEmailData>();
    }

    async sendVerificationEmail(email : string) {
        const user = await this.userBroker.findUserByEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`)
        }
        if (user.verified) {
            throw new Error(`User with email ${email} is already verified`)
        }
        await this.accessTokenService.deleteExistingToken(user);
        const token = await this.accessTokenService.generate(user);
        const verificationEmail = new VerificationEmail(user, token);
        return await this.emailBroker.send(verificationEmail);
    }
}