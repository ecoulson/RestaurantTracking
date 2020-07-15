import IEmailMessage from "./IEmailMessage";

export default interface IEmailMessageBuilder {
    setTo(address: string) : IEmailMessageBuilder;
    setFrom(address: string) : IEmailMessageBuilder;
    setSubject(subject: string) : IEmailMessageBuilder;
    setTemplateId(templateId: string) : IEmailMessageBuilder;
    setData(data : {}) : IEmailMessageBuilder;
    build() : IEmailMessage;
}