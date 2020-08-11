import OrganizationUserVerificationEmailService from "../../../../../src/services/Organization/OrganizationAccount/OrganizationUserVerificationEmailService"
import Scope from "../../../../../src/services/Token/Scope"
import EmailBroker from "../../../../../src/brokers/EmailBroker"
import EncryptedTokenService from "../../../../../src/services/Token/EncryptedTokenService"
import TokenBroker from "../../../../../src/brokers/TokenBroker"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator"

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Organization User Verification Email Service", () => {
    test("Builds an email", async () => {
        const user = userGenerator.generate();
        const token = tokenGenerator.generate();
        EncryptedTokenService.prototype.decryptToken =
            jest.fn().mockResolvedValue(new Map([
                ["organizationId", "foo"]
            ]))
        const service = new OrganizationUserVerificationEmailService(
            new EncryptedTokenService(
                [Scope.VerifyEmail], 1, new TokenBroker()
            ),
            new EmailBroker()
        )

        const message = await service.buildEmail(user, token);

        expect(message).toEqual({
            to: user.email,
            from: "support@adaptsolutions.tech",
            subject: "Verify Your Adapt Organization Account",
            templateId: "d-b3a11d69cfcc4b30940ac5f28e181770",
            data: {
                verificationLink:
                    `http://undefined:undefined/check-in/foo/verification?email=${user.email}&token=${token.value}`
            }
        })
    })
})