import InternalURLBuilder from "../../../lib/URL/InternalURLBuilder";
import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import IBuildEmailStrategy from "../../Email/IBuildEmailStrategy";
import IEmailMessageBuilder from "../../Email/IEmailMessageBuilder";
import EmailMessageBuilder from "../../Email/EmailMessageBuilder";

export default class UserVerificationEmailStrategy implements IBuildEmailStrategy {
    private emailBuilder : IEmailMessageBuilder;
    private user : IUser;
    private token : IToken;

    constructor(user : IUser, token : IToken) {
        this.emailBuilder = new EmailMessageBuilder();
        this.user = user;
        this.token = token;
    }

    async build() {
        const internalURLBuilder = new InternalURLBuilder();
        return this.emailBuilder
            .setTo(this.user.email)
            .setFrom("support@adaptsolutions.tech")
            .setSubject("Verify Your Adapt Account")
            .setTemplateId("d-987392a0267440c7a4d329a84d5d39ff")
            .setData({
                verificationLink: internalURLBuilder.build(`verification?email=${this.user.email}&token=${this.token.value}`),
                spamLink: internalURLBuilder.build(`spam?email=${this.user.email}&token=${this.token.value}`)
            }).build()
    }
}