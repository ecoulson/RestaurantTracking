import IEmail from "./IEmail";
import IEmailMessage from "./IEmailMessage";
import sgMail from "@sendgrid/mail"
import IEmailData from "./IEmailData";
import IEmailMessageBuilder from "./IEmailMessageBuilder";
import EmailData from "./EmailData";

export default class Email implements IEmail {
    private messageBuilder : IEmailMessageBuilder

    constructor(messageBuilder : IEmailMessageBuilder) {
        this.messageBuilder = messageBuilder;
    }

    async send() : Promise<IEmailData> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const verificationMessage = this.messageBuilder.build();
        await this.deliver(verificationMessage);
        return new EmailData(verificationMessage.getMessage());
    };

    protected async deliver(message : IEmailMessage) {
        try {
            await sgMail.send(message.getMessage());
        } catch (error) {
            throw error;
        }
    }
}