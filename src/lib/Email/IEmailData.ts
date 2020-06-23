import { MailDataRequired } from "@sendgrid/mail";

export default interface IEmailData {
    message : MailDataRequired;
}