import { MailDataRequired } from "@sendgrid/mail";

export default interface IEmailMessage {
    getMessage() : MailDataRequired;
}