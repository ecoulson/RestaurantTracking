import OrganizationAccountPasswordRecoverService from "../../../../../src/services/Organization/OrganizationAccount/OrganizationAccountPasswordRecoveryService"
import EncryptedTokenService from "../../../../../src/services/Token/EncryptedTokenService";
import Scope from "../../../../../src/services/Token/Scope";
import TokenBroker from "../../../../../src/brokers/TokenBroker";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Organization Account Password Recovery Service", () => {
    test("Builds an email message", async () => {
        const user = userGenerator.generate();
        const token = tokenGenerator.generate();
        EncryptedTokenService.prototype.decryptToken =
            jest.fn().mockImplementation(x => new Map(
                [["organizationId", "foo"]]
            ))
        const service = new OrganizationAccountPasswordRecoverService(
            new EncryptedTokenService(
                [Scope.VerifyEmail], 24, new TokenBroker()
            )
        );

        const message = await service.buildEmailMessage(user, token)

        expect(message).toEqual({
            to: user.email,
            from: "support@adaptsolutions.tech",
            templateId: "d-e0f9185e8da44ed0a7dd653e45fe06f6",
            subject: "",
            data: {
                resetPasswordUrl:
                    `http://undefined:undefined/check-in/foo/reset-password?email=${user.email}&token=${token.value}`,
                alertUrl:
                    `http://undefined:undefined/check-in/foo/cancel-recover?email=${user.email}&token=${token.value}`
            }
        })
    })
})