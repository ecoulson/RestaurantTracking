import Email from "./Email";
import sgMail from "@sendgrid/mail";
import EmailData from "./EmailData";
import PasswordRecoveryEmailMessage from "./PasswordRecoveryEmailMessage";

export default class PasswordRecoveryEmail extends Email {
    private address : string

    constructor(address: string) {
        super();
        this.address = address;
    }

    async send() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const passwordRecoveryMessage = new PasswordRecoveryEmailMessage(this.address);
        await this.deliver(passwordRecoveryMessage)
        return new EmailData(passwordRecoveryMessage.getMessage());
    }

    getAddress(): string {
        return this.address;
    }
}