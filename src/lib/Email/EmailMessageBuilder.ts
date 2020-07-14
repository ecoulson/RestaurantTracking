import IEmailMessageBuilder from "./IEmailMessageBuilder";
import IEmailMessage from "./IEmailMessage";
import EmailMessage from "./EmailMessage";

export default class EmailMessageBuilder implements IEmailMessageBuilder {
    private to : string;
    private from : string;
    private subject : string;
    private templateId : string;
    private data : { [id: string] : string };

    constructor() {
        this.to = "";
        this.from = "";
        this.subject = "";
        this.data = {}
        this.templateId = "";
    }

    setTo(address: string): IEmailMessageBuilder {
        this.to = address;
        return this as unknown as IEmailMessageBuilder;
    }

    setFrom(address: string): IEmailMessageBuilder {
        this.from = address;
        return this as unknown as IEmailMessageBuilder;
    }

    setSubject(subject: string): IEmailMessageBuilder {
        this.subject = subject;
        return this as unknown as IEmailMessageBuilder;

    }

    setTemplateId(templateId: string): IEmailMessageBuilder {
        this.templateId = templateId;
        return this as unknown as IEmailMessageBuilder;

    }

    setData(data: { [id: string] : string }): IEmailMessageBuilder {
        this.data = data;
        return this as unknown as IEmailMessageBuilder;
    }

    build(): IEmailMessage {
        const message = new EmailMessage(
            this.to,
            this.from,
            this.subject,
            this.templateId,
            this.data
        )
        this.reset();
        return message;
    }

    private reset() {
        this.to = "";
        this.from = "";
        this.templateId = "";
        this.subject = "";
        this.data = {};
    }
}