import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import VerifyUserStrategy from "../../../../../src/services/User/Registration/VerifyUserStrategy";
import TokenService from "../../../../../src/services/Token/TokenService";
import UserBroker from "../../../../../src/brokers/UserBroker";
import EmailService from "../../../../../src/services/Email/EmailService";
import faker from "faker";
import Scope from "../../../../../src/services/Token/Scope";
import TokenBroker from "../../../../../src/brokers/TokenBroker";
import EmailBroker from "../../../../../src/brokers/EmailBroker";
import UserVerificationEmailStrategy from "../../../../../src/services/User/Registration/UserVerificationEmailStrategy";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Verify user", () => {
    test("User already verified", async () => {
        userGenerator.setVerified()
        const user = userGenerator.generate();
        UserBroker.prototype.findUserByEmail =
            jest.fn().mockResolvedValue(user);
        const strategy = new VerifyUserStrategy(
            new TokenService([Scope.VerifyEmail], 24, new TokenBroker()),
            new UserBroker(),
            new EmailService(new EmailBroker()),
            faker.internet.email()
        )

        try {
            await strategy.verify();
        } catch (error) {
            expect(error).toEqual(
                new Error(`User with email ${user.email} is already verified`)
            )
        }
        
        expect.assertions(1)
    })

    test("Sent user verification email", async () => {
        const user = userGenerator.generate();
        const token = tokenGenerator.generate();
        UserBroker.prototype.findUserByEmail =
            jest.fn().mockResolvedValue(user);
        TokenService.prototype.deleteExistingToken = jest.fn();
        TokenService.prototype.generate =
            jest.fn().mockResolvedValue(token)
        EmailService.prototype.sendEmail = jest.fn();
        const strategy = new VerifyUserStrategy(
            new TokenService([Scope.VerifyEmail], 24, new TokenBroker()),
            new UserBroker(),
            new EmailService(new EmailBroker()),
            faker.internet.email()
        )

        await strategy.verify();

        expect(EmailService.prototype.sendEmail)
            .toHaveBeenCalledWith(
                new UserVerificationEmailStrategy(user, token)
            )
    })
})