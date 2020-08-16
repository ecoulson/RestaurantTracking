import UserVerificationEmailStrategy from "../../../../../src/services/User/Registration/UserVerificationEmailStrategy"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator()

describe("User Verification Email Strategy", () => {
    test("User Verification Email Strategy", async () => {
        const user = userGenerator.generate()
        const token = tokenGenerator.generate();
        const strategy = new UserVerificationEmailStrategy(user, token);

        const message = await strategy.build();

        expect(message).toEqual({
            subject: "Verify Your Adapt Account",
            to: user.email,
            from: "support@adaptsolutions.tech",
            templateId: "d-987392a0267440c7a4d329a84d5d39ff",
            data: {
                verificationLink: `http://undefined:undefined/verification?email=${user.email}&token=${token.value}`,
                spamLink: `http://undefined:undefined/spam?email=${user.email}&token=${token.value}`,
            }
        })
    })
})