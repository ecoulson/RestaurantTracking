import IEmail from "./IEmail";
import IEmailMessage from "./IEmailMessage";
import sgMail from "@sendgrid/mail"
import IEmailData from "./IEmailData";
import EmailData from "./EmailData";

export default class Email implements IEmail {
    private message : IEmailMessage;

    constructor(message : IEmailMessage) {
        this.message = message;
    }

    async send() : Promise<IEmailData> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send(this.message.getMessage());
        return new EmailData(this.message.getMessage());
    }
}