import Email from "./Email";
import sgMail from "@sendgrid/mail";
import SpamConfirmationEmailMessage from "./SpamConfirmationEmailMessage";
import EmailData from "./EmailData";

export default class SpamConfirmationEmail extends Email {
    private address : string

    constructor(address: string) {
        super();
        this.address = address;
    }

    async send() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const spamMessage = new SpamConfirmationEmailMessage(this.address);
        await this.deliver(spamMessage)
        return new EmailData(spamMessage.getMessage());
    }

    getAddress(): string {
        return this.address;
    }
}