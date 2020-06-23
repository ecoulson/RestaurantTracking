import IEmail from "./IEmail";
import IEmailMessage from "./IEmailMessage";

import sgMail from "@sendgrid/mail"
import IEmailData from "./IEmailData";

export default abstract class Email implements IEmail {
    abstract send() : Promise<IEmailData>;
    
    abstract getAddress() : string;

    protected async deliver(message : IEmailMessage) {
        try {
            await sgMail.send(message.getMessage());
        } catch (error) {
            throw error;
        }
    }
}