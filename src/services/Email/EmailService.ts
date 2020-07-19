import IEmailService from "./IEmailService";

import EmailBroker from "../../brokers/EmailBroker";
import IEmailMessageBuilder from "./IEmailMessageBuilder";
import Email from "./Email";
import EmailMessageBuilder from "./EmailMessageBuilder";
import IBuildEmailStrategy from "./IBuildEmailStrategy";

export default class EmailService implements IEmailService {
    private emailBroker : EmailBroker;
    protected emailBuilder : IEmailMessageBuilder;

    constructor() {
        this.emailBroker = new EmailBroker();
        this.emailBuilder = new EmailMessageBuilder();
    }

    async sendEmail(buildEmailStrategy : IBuildEmailStrategy) {
        const verificationEmail = new Email(await buildEmailStrategy.build());
        return await this.emailBroker.send(verificationEmail);
    }
}