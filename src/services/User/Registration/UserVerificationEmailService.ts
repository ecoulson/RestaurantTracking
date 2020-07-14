import VerificationEmailService from "./VerificationEmailService";
import InternalURLBuilder from "../../../lib/URL/InternalURLBuilder";
import IUser from "../../../models/user/IUser";
import IToken from "../../../models/token/IToken";

export default class UserVerificationEmailService extends VerificationEmailService {
    buildEmail(user : IUser, token : IToken) {
        const internalURLBuilder = new InternalURLBuilder();
        this.emailBuilder
            .setTo(user.email)
            .setFrom("support@adaptsolutions.tech")
            .setSubject("Verify Your Adapt Account")
            .setTemplateId("d-987392a0267440c7a4d329a84d5d39ff")
            .setData({
                verificationLink: internalURLBuilder.build(`verification?email=${user.email}&token=${token.value}`),
                spamLink: internalURLBuilder.build(`spam?email=${user.email}&token=${token.value}`)
            })
    }
}