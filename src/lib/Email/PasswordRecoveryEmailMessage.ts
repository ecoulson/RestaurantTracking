import IEmailMessage from "./IEmailMessage";
import { MailDataRequired } from "@sendgrid/mail";
import IUser from "../../models/user/IUser";
import IToken from "../../models/token/IToken";

export default class PasswordRecoveryEmailMessage implements IEmailMessage {
    private user : IUser;
    private token : IToken;

    constructor(user : IUser, token : IToken) {
        this.user = user;
        this.token = token;
    }

    getMessage() {
        return { 
            to: this.user.email,
            from: 'support@adaptsolutions.tech',
            templateId: "d-e0f9185e8da44ed0a7dd653e45fe06f6",
            dynamicTemplateData: {
                resetPasswordUrl: this.getResetPassword(),
                alertUrl: this.getAlertUrl()
            }
        } as MailDataRequired
    }

    private getResetPassword() {
        if (process.env.NODE_ENV === "production") {
            return `http://${process.env.HOST_NAME}/user/confirm?email=${this.user.email}&token=${this.token.value}`;
        } else {
            return `http://${process.env.HOST_NAME}:${process.env.PORT}/user/confirm?email=${this.user.email}&token=${this.token.value}`;
        }
    }

    private getAlertUrl() {
        if (process.env.NODE_ENV === "production") {
            return `http://${process.env.HOST_NAME}/user/cancel_recover?email=${this.user.email}&token=${this.token.value}`;
        } else {
            return `http://${process.env.HOST_NAME}:${process.env.PORT}/user/cancel_recover?email=${this.user.email}&token=${this.token.value}`;
        }
    }
}