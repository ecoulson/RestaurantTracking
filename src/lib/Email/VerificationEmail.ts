import sgMail, { MailDataRequired } from "@sendgrid/mail";
import IToken from "../../models/token/IToken";
import IUser from "../../models/user/IUser";
import IVerificationEmailData from "./IVerificationEmailData";
import IEmail from "./IEmail";

export default class VerificationEmail implements IEmail {
    private token : IToken;
    private user : IUser;

    constructor(user : IUser, token : IToken) {
        this.user = user;
        this.token = token;
    }

    getAddress() {
        return this.user.email;
    }

    async send() : Promise<IVerificationEmailData> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg : MailDataRequired = {
            from: 'support@adaptsolutions.tech',
            subject: 'Verify Your Adapt Account',
            to: this.user.email,
            dynamicTemplateData: {
                verificationLink: this.getVerifiyUrl(),
                spamLink: this.getSpamUrl()
            },
            templateId: "d-987392a0267440c7a4d329a84d5d39ff"
        };
        try {
            await sgMail.send(msg);
            return {
                token: this.token,
                user: this.user,
                message: msg
            }
        } catch (error) {
            throw error;
        }
    }

    private getVerifiyUrl() {
        return `http://${process.env.HOST_NAME}:${process.env.PORT}/user/verify?email=${this.user.email}&token=${this.token.value}`;
    }

    private getSpamUrl() {
        return `http://${process.env.HOST_NAME}:${process.env.PORT}/user/spam?email=${this.user.email}&token=${this.token.value}`;
    }
}