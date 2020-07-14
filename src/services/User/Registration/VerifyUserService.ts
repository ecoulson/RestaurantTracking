import ITokenService from "../../Token/ITokenService";
import UserBroker from "../../../brokers/UserBroker";
import IVerificationEmailService from "./IVerificationEmailService";
import IVerifyUserService from "./IVerifyUserService";

export default class VerifyUserService implements IVerifyUserService {
    private tokenService : ITokenService;
    private userBroker : UserBroker;
    private emailService : IVerificationEmailService;

    constructor(tokenService : ITokenService, userBroker : UserBroker, emailService : IVerificationEmailService) {
        this.tokenService = tokenService;
        this.userBroker = userBroker;
        this.emailService = emailService;
    }

    async verify(email : string) {
        const user = await this.userBroker.findUserByEmail(email);
        if (user.verified) {
            throw new Error(`User with email ${user.email} is already verified`)
        }
        await this.tokenService.deleteExistingToken(user);
        const token = await this.tokenService.generate(user);
        await this.emailService.sendVerificationEmail(user, token);
        return user;
    }
}