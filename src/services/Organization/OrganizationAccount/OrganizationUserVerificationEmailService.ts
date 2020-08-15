import InternalURLBuilder from "../../../lib/URL/InternalURLBuilder";
import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import EmailService from "../../Email/EmailService";
import ITokenService from "../../Token/ITokenService";
import EmailBroker from "../../../brokers/EmailBroker";
import EmailMessageBuilder from "../../Email/EmailMessageBuilder";

export default class OrganizationUserVerificationEmailService extends EmailService {
    private tokenService : ITokenService;

    constructor(tokenService : ITokenService, emailBroker : EmailBroker) {
        super(emailBroker);
        this.tokenService = tokenService;
    }

    async buildEmail(user : IUser, token : IToken) {
        const internalURLBuilder = new InternalURLBuilder();
        const values = await this.tokenService.decryptToken(token);
        return new EmailMessageBuilder()
            .setTo(user.email)
            .setFrom("support@adaptsolutions.tech")
            .setSubject("Verify Your Adapt Organization Account")
            .setTemplateId("d-b3a11d69cfcc4b30940ac5f28e181770")
            .setData({
                verificationLink: internalURLBuilder.build(
                    `check-in/${values.get("organizationId") as string}/verification?email=${user.email}&token=${token.value}`
                ),
            })
    }
}