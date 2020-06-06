import sgMail from "@sendgrid/mail";
import IToken from "../../models/token/IToken";
import IUser from "../../models/user/IUser";
import IVerificationEmailData from "./IVerificationEmailData";

export default class VerificationEmail {
    async send(token : IToken, user : IUser) : Promise<IVerificationEmailData> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: user.email,
            from: 'support@adaptsolutions.tech',
            subject: 'Verification',
            text: 'Verification email',
            html: `<a href=${this.getLink(token.value, user.email)}>Verify Account</a>`,
        };
        try {
            await sgMail.send(msg);
            return {
                token,
                user,
                message: msg
            }
        } catch (error) {
            throw error;
        }
    }

    private getLink(token : string, email : string) {
        return `http://${process.env.HOST_NAME}:${process.env.PORT}/user/verify?email=${email}&token=${token}`;
    }
}