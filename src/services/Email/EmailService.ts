import IEmailService from "./IEmailService";
import EmailBroker from "../../brokers/EmailBroker";
import Email from "./Email";
import IBuildEmailStrategy from "./IBuildEmailStrategy";

export default class EmailService implements IEmailService {
    private emailBroker : EmailBroker;

    constructor(emailBroker : EmailBroker) {
        this.emailBroker = emailBroker;
    }

    async sendEmail(buildEmailStrategy : IBuildEmailStrategy) {
        return await this.emailBroker.send(
            new Email(await buildEmailStrategy.build())
        );
    }
}