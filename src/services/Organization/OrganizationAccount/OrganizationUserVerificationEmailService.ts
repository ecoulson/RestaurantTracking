import InternalURLBuilder from "../../../lib/URL/InternalURLBuilder";
import IUser from "../../../models/user/IUser";
import IToken from "../../../models/token/IToken";
import VerificationEmailService from "../../User/Registration/VerificationEmailService";
import ITokenService from "../../Token/ITokenService";

export default class OrganizationUserVerificationEmailService extends VerificationEmailService {
    private tokenService : ITokenService;

    constructor(tokenService : ITokenService) {
        super();
        this.tokenService = tokenService;
    }

    async buildEmail(user : IUser, token : IToken) {
        const internalURLBuilder = new InternalURLBuilder();
        const values = await this.tokenService.decryptToken(token);
        this.emailBuilder
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