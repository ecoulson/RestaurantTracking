import IUser from "../../models/user/IUser"
import IToken from "../../models/token/IToken"
import IEmailMessage from "./IEmailMessage";

export default class VerificationEmailMessage implements IEmailMessage {
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
            subject: 'Verify Your Adapt Account',
            dynamicTemplateData: {
                verificationLink: this.getVerifyUrl(),
                spamLink: this.getSpamUrl()
            },
            templateId: "d-987392a0267440c7a4d329a84d5d39ff"
        }
    }

    private getVerifyUrl() {
        if (process.env.NODE_ENV === "production") {
            return `http://${process.env.HOST_NAME}/user/verification/verify?email=${this.user.email}&token=${this.token.value}`;
        } else {
            return `http://${process.env.HOST_NAME}:${process.env.PORT}/user/verification/verify?email=${this.user.email}&token=${this.token.value}`;
        }
    }

    private getSpamUrl() {
        if (process.env.NODE_ENV === "production") {
            return `http://${process.env.HOST_NAME}/user/verification/spam?email=${this.user.email}&token=${this.token.value}`;
        } else {
            return `http://${process.env.HOST_NAME}:${process.env.PORT}/user/verification/spam?email=${this.user.email}&token=${this.token.value}`;
        }
    }
}