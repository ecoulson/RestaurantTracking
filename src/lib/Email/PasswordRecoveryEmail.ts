import Email from "./Email";
import sgMail from "@sendgrid/mail";
import EmailData from "./EmailData";
import PasswordRecoveryEmailMessage from "./PasswordRecoveryEmailMessage";
import IUser from "../../models/user/IUser";
import IToken from "../../models/token/IToken";

export default class PasswordRecoveryEmail extends Email {
    private user : IUser;
    private token : IToken;

    constructor(user : IUser, token : IToken) {
        super();
        this.user = user;
        this.token = token;
    }

    async send() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const passwordRecoveryMessage = new PasswordRecoveryEmailMessage(this.user, this.token);
        await this.deliver(passwordRecoveryMessage)
        return new EmailData(passwordRecoveryMessage.getMessage());
    }

    getAddress(): string {
        return this.user.email;
    }
}