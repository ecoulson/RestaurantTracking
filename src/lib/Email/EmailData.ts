import IEmailData from "./IEmailData";
import { MailDataRequired } from "@sendgrid/mail";

export default class EmailData implements IEmailData {
    message: MailDataRequired;

    constructor(message : MailDataRequired) {
        this.message = message;
    }
}