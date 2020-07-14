import IEmailMessage from "./IEmailMessage";
import { MailDataRequired } from "@sendgrid/mail";


export default class EmailMessage implements IEmailMessage {
    private to: string;
    private from: string;
    private subject: string;
    private templateId: string;
    private data: { [ id: string ] : string }

    constructor(to: string, from: string, subject: string, templateId: string, data : {[id: string] : string}) {
        this.to = to;
        this.from = from;
        this.subject = subject;
        this.templateId = templateId;
        this.data = data;
    }

    getMessage(): MailDataRequired {
        return {
            to: this.to,
            from: this.from,
            subject: this.subject,
            dynamicTemplateData: this.data,
            templateId: this.templateId
        }
    }

}