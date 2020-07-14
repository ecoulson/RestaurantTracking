jest.mock("../../../../../src/services/Token/TokenService");
import PasswordRecoveryService from "../../../../../src/services/User/PasswordRecovery/PasswordRecoveryService";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import UserModel from "../../../../../src/models/user/UserModel";
import TokenService from "../../../../../src/services/Token/TokenService";
import EmailData from "../../../../../src/lib/Email/EmailData";
import EmailMessageBuilder from "../../../../../src/lib/Email/EmailMessageBuilder";
import Email from "../../../../../src/lib/Email/Email";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

beforeEach(() => {
    Email.prototype.send = jest.fn();
    jest.resetAllMocks();
})

describe("Password Recovery Service", () => {
    describe("sendForgotPasswordEmail", () => {
        test("Removes existing forgot password token", async () => {
            tokenGenerator.setValue("value")
            const user = userGenerator.generate();
            TokenService.prototype.generate = jest.fn().mockResolvedValue(tokenGenerator.generate())
            const service = new PasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.sendForgotPasswordEmail(user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`No user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("Removes existing token", async () => {
            tokenGenerator.setValue("value")
            const user = userGenerator.generate();
            TokenService.prototype.generate = jest.fn().mockResolvedValue(tokenGenerator.generate())
            const service = new PasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            await service.sendForgotPasswordEmail(user.email);

            expect(TokenService.prototype.deleteExistingToken).toHaveBeenCalledWith(user)
        })

        test("Generates new forgot password token", async () => {
            tokenGenerator.setValue("value")
            const user = userGenerator.generate();
            TokenService.prototype.generate = jest.fn().mockResolvedValue(tokenGenerator.generate())
            const service = new PasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            await service.sendForgotPasswordEmail(user.email);

            expect(TokenService.prototype.generate).toHaveBeenCalledWith(user);
        });

        test("Sends forgot password email", async () => {
            tokenGenerator.setValue("value")
            const user = userGenerator.generate();
            TokenService.prototype.generate = jest.fn().mockResolvedValue(tokenGenerator.generate())
            const service = new PasswordRecoveryService();
            const expectedEmailData = new EmailData(new EmailMessageBuilder().build().getMessage())
            Email.prototype.send = jest.fn().mockResolvedValue(expectedEmailData);
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            const data = await service.sendForgotPasswordEmail(user.email);

            expect(data).toEqual(expectedEmailData);
        });
    })
})