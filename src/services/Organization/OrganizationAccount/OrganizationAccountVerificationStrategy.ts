import IVerificationStrategy from "../../User/Verification/IVerificationStrategy";
import UserBroker from "../../../brokers/UserBroker";
import ITokenService from "../../Token/ITokenService";
import TokenBroker from "../../../brokers/TokenBroker";
import Scope from "../../Token/Scope";

export default class OrganizationAccountVerificationStrategy implements IVerificationStrategy {
    private email: string;
    private verificationCode: string;
    private userBroker : UserBroker;
    private tokenService : ITokenService;
    private tokenBroker : TokenBroker;

    constructor(
        userBroker : UserBroker, 
        email: string, 
        verificationCode: string,
        tokenService : ITokenService,
        tokenBroker : TokenBroker
    ) {
        this.email = email;
        this.verificationCode = verificationCode;
        this.userBroker = userBroker;
        this.tokenService = tokenService;
        this.tokenBroker = tokenBroker
    }

    async verify() {
        const user = await this.userBroker.findUserByEmail(this.email);
        if (!user) {
            throw new Error(`No user with email ${this.email}`)
        }
        const tokens = await this.tokenBroker.getTokens(user)
        const verificationTokens = tokens.filter((x) => x.scope.includes(Scope.VerifyEmail));
        if (verificationTokens.length === 0) {
            throw new Error(`No verification tokens for user with email: ${this.email}`)
        }
        const values = await this.tokenService.decryptToken(verificationTokens[0]);
        if (values.get("code") === this.verificationCode) {
            await this.tokenService.deleteExistingToken(user)
            user.verified = true;
            return await user.save();
        } else {
            throw new Error("Failed to verify user, incorrect verification code");
        }
    }
}