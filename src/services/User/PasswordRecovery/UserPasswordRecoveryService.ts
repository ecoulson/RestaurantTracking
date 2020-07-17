import PasswordRecoveryService from "./PasswordRecoveryService";
import InternalURLBuilder from "../../../lib/URL/InternalURLBuilder";
import EmailMessageBuilder from "../../../lib/Email/EmailMessageBuilder";
import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";

export default class UserPasswordRecoveryService extends PasswordRecoveryService {
    async buildEmailMessage(user : IUser, token: IToken) {
        const internalURLBuilder = new InternalURLBuilder();
        return new EmailMessageBuilder()
            .setTo(user.email)
            .setFrom("support@adaptsolutions.tech")
            .setTemplateId("d-e0f9185e8da44ed0a7dd653e45fe06f6")
            .setData({
                resetPasswordUrl: internalURLBuilder.build(`confirm-recover?email=${user.email}&token=${token.value}`),
                alertUrl: internalURLBuilder.build(`cancel-recover?email=${user.email}&token=${token.value}`)
            })
    }
}