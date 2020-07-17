import IVerificationEmailService from "./IVerificationEmailService";

import EmailBroker from "../../../brokers/EmailBroker";
import IEmailMessageBuilder from "../../../lib/Email/IEmailMessageBuilder";
import Email from "../../../lib/Email/Email";
import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import EmailMessageBuilder from "../../../lib/Email/EmailMessageBuilder";

export default abstract class VerificationEmailService implements IVerificationEmailService {
    private emailBroker : EmailBroker;
    protected emailBuilder : IEmailMessageBuilder;

    constructor() {
        this.emailBroker = new EmailBroker();
        this.emailBuilder = new EmailMessageBuilder();
    }

    async sendVerificationEmail(user : IUser, token : IToken) {
        await this.buildEmail(user, token);
        const verificationEmail = new Email(this.emailBuilder);
        return await this.emailBroker.send(verificationEmail);
    }

    abstract async buildEmail(user : IUser, token : IToken) : Promise<void>;
}