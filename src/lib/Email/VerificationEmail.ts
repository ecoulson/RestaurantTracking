import sgMail from "@sendgrid/mail";
import IToken from "../../models/token/IToken";
import IUser from "../../models/user/IUser";
import IVerificationEmailData from "./IVerificationEmailData";
import VerificationEmailMessage from "./VerificationEmailMessage";
import Email from "./Email";
import VerificationEmailData from "./VerificationEmailData";

export default class VerificationEmail extends Email {
    private token : IToken;
    private user : IUser;

    constructor(user : IUser, token : IToken) {
        super();
        this.user = user;
        this.token = token;
    }

    getAddress() {
        return this.user.email;
    }

    async send() : Promise<IVerificationEmailData> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const verificationMessage = new VerificationEmailMessage(this.user, this.token);
        await this.deliver(verificationMessage);
        return new VerificationEmailData(
            this.user, 
            verificationMessage.getMessage(), 
            this.token
        );
    }
}