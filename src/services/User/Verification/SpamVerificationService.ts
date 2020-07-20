import ISpamVerificationService from "./ISpamVerificationService";
import IUser from "../../../models/User/IUser";
import Scope from "../../Token/Scope";
import IToken from "../../../models/Token/IToken";
import UserBroker from "../../../brokers/UserBroker";
import EmailMessageBuilder from "../../Email/EmailMessageBuilder";
import Email from "../../Email/Email";
import TokenBroker from "../../../brokers/TokenBroker";

export default class SpamVerificationService implements ISpamVerificationService {
    private userBroker : UserBroker;
    private tokenBroker : TokenBroker;

    constructor() {
        this.userBroker = new UserBroker();
        this.tokenBroker = new TokenBroker();
    }

    async cancelAccount(email: string, token: string) {
        const user = await this.userBroker.findUserByEmail(email);
        this.ensureUserExists(user, email);
        this.ensureUserIsUnverified(user);
        const tokens = await this.tokenBroker.getTokens(user);
        const verificationTokens = this.getVerificationTokens(tokens);
        if (this.isEmpty(verificationTokens)) {
            throw new Error(`User with ${user.email} has no verification tokens`)
        }
        const verificationToken = verificationTokens[0];
        if (verificationToken.value !== token) {
            throw new Error(`Token values do not match`);
        }
        await this.tokenBroker.remove(verificationToken);
        await this.userBroker.removeUser(user);
        const spamEmail = new Email(this.buildEmailMessage(user));
        return await spamEmail.send();
    }

    private ensureUserExists(user : IUser, email: string) {
        if (!user) {
            throw new Error(`No user with email ${email}`);
        }
    }

    private ensureUserIsUnverified(user : IUser) {
        if (user.verified) {
            throw new Error(`User with email ${user.email} is already verified`)
        }
    }

    private getVerificationTokens(tokens : IToken[]) {
        return tokens.filter((token) => {
            return token.scope.includes(Scope.VerifyEmail);
        });
    }

    private isEmpty(token : IToken[]) {
        return token.length === 0;
    }

    private buildEmailMessage(user : IUser) {
        return new EmailMessageBuilder()
            .setTo(user.email)
            .setFrom("support@adaptsolutions.tech")
            .setTemplateId("d-df44f4fbc9644f27b2b63a16232c3489")
            .build()
    }
}