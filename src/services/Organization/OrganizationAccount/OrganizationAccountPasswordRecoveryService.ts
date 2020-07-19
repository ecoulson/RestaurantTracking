import PasswordRecoveryService from "../../User/PasswordRecovery/PasswordRecoveryService";
import InternalURLBuilder from "../../../lib/URL/InternalURLBuilder";
import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import EmailMessageBuilder from "../../../lib/Email/EmailMessageBuilder";

export default class OrganizationAccountPasswordRecoverService extends PasswordRecoveryService {
    async buildEmailMessage(user : IUser, token : IToken) {
        const internalURLBuilder = new InternalURLBuilder();
        const parameters = await this.tokenService.decryptToken(token);
        return new EmailMessageBuilder()
            .setTo(user.email)
            .setFrom("support@adaptsolutions.tech")
            .setTemplateId("d-e0f9185e8da44ed0a7dd653e45fe06f6")
            .setData({
                resetPasswordUrl: internalURLBuilder.build(
                    `check-in/${parameters.get("organizationId")}/reset-password?email=${user.email}&token=${token.value}`
                ),
                alertUrl: internalURLBuilder.build(
                    `check-in/${parameters.get("organizationId")}/cancel-recover?email=${user.email}&token=${token.value}`
                )
            })
    }
}