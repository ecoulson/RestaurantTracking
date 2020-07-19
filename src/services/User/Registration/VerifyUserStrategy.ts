import IVerifyUserStrategy from "./IVerifyUserStrategy";
import UserBroker from "../../../brokers/UserBroker";
import IVerificationEmailService from "../../Email/IEmailService";
import ITokenService from "../../Token/ITokenService";
import UserVerificationEmailStrategy from "./UserVerificationEmailStrategy";

export default class VerifyUserStrategy implements IVerifyUserStrategy {
    private tokenService : ITokenService;
    private userBroker : UserBroker;
    private emailService : IVerificationEmailService;
    private email: string;

    constructor(
        tokenService : ITokenService,
        userBroker : UserBroker,
        emailService : IVerificationEmailService,
        email: string,
    ) {
        this.tokenService = tokenService;
        this.userBroker = userBroker;
        this.emailService = emailService;
        this.email = email;
    }

    async verify() {
        const user = await this.userBroker.findUserByEmail(this.email);
        if (user.verified) {
            throw new Error(`User with email ${user.email} is already verified`)
        }
        await this.tokenService.deleteExistingToken(user);
        const token = await this.tokenService.generate(user, new Map<string, string>());
        await this.emailService.sendEmail(new UserVerificationEmailStrategy(user, token));
        return user;
    }
}