import UserPasswordRecoveryService from "../../../../../src/services/User/PasswordRecovery/UserPasswordRecoveryService"
import TokenBroker from "../../../../../src/brokers/TokenBroker"
import TokenService from "../../../../../src/services/Token/TokenService"
import Scope from "../../../../../src/services/Token/Scope"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator"

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("User Password Recovery Service", () => {
    test("Build email message", async () => {
        const service = new UserPasswordRecoveryService(
            new TokenService([Scope.ResetPassword], 1, new TokenBroker())
        );
        const user = userGenerator.generate();
        const token = tokenGenerator.generate();

        const message = await service.buildEmailMessage(user, token);

        expect(message).toEqual({
            to: user.email,
            subject: "",
            from: "support@adaptsolutions.tech",
            templateId: "d-e0f9185e8da44ed0a7dd653e45fe06f6",
            data: {
                resetPasswordUrl: `http://undefined:undefined/confirm-recover?email=${user.email}&token=${token.value}`,
                alertUrl: `http://undefined:undefined/cancel-recover?email=${user.email}&token=${token.value}`
            }
        })
    })


})