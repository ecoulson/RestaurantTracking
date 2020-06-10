import IEmailMessage from "./IEmailMessage";
import { MailDataRequired } from "@sendgrid/mail";

export default class PasswordRecoveryEmailMessage implements IEmailMessage {
    private address : string;

    constructor(address : string) {
        this.address = address;
    }

    getMessage() {
        return { 
            to: this.address,
            from: 'support@adaptsolutions.tech',
            templateId: "d-e0f9185e8da44ed0a7dd653e45fe06f6",
            dynamicTemplateData: {
                resetPasswordUrl: "",
                alertUrl: ""
            }
        } as MailDataRequired
    }
}