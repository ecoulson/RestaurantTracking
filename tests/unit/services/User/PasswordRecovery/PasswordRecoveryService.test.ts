jest.mock("../../../../../src/services/Token/TokenService");
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import UserModel from "../../../../../src/models/User/UserModel";
import TokenService from "../../../../../src/services/Token/TokenService";
import EmailData from "../../../../../src/services/Email/EmailData";
import EmailMessageBuilder from "../../../../../src/services/Email/EmailMessageBuilder";
import Email from "../../../../../src/services/Email/Email";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import Scope from "../../../../../src/services/Token/Scope";
import UserPasswordRecoveryService from "../../../../../src/services/User/PasswordRecovery/UserPasswordRecoveryService";

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
            const service = new UserPasswordRecoveryService(new TokenService([Scope.ResetPassword], 1));
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.sendForgotPasswordEmail(user.email, new Map());
            } catch (error) {
                expect(error).toEqual(new Error(`No user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("Removes existing token", async () => {
            tokenGenerator.setValue("value")
            const user = userGenerator.generate();
            TokenService.prototype.generate = jest.fn().mockResolvedValue(tokenGenerator.generate())
            const service = new UserPasswordRecoveryService(new TokenService([Scope.ResetPassword], 1));
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            await service.sendForgotPasswordEmail(user.email, new Map());

            expect(TokenService.prototype.deleteExistingToken).toHaveBeenCalledWith(user)
        })

        test("Generates new forgot password token", async () => {
            tokenGenerator.setValue("value")
            const user = userGenerator.generate();
            TokenService.prototype.generate = jest.fn().mockResolvedValue(tokenGenerator.generate())
            const service = new UserPasswordRecoveryService(new TokenService([Scope.ResetPassword], 1));
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            await service.sendForgotPasswordEmail(user.email, new Map());

            expect(TokenService.prototype.generate).toHaveBeenCalledWith(user, new Map());
        });

        test("Sends forgot password email", async () => {
            tokenGenerator.setValue("value")
            const user = userGenerator.generate();
            TokenService.prototype.generate = jest.fn().mockResolvedValue(tokenGenerator.generate())
            const service = new UserPasswordRecoveryService(new TokenService([Scope.ResetPassword], 1));
            const expectedEmailData = new EmailData(new EmailMessageBuilder().build().getMessage())
            Email.prototype.send = jest.fn().mockResolvedValue(expectedEmailData);
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            const data = await service.sendForgotPasswordEmail(user.email, new Map());

            expect(data).toEqual(expectedEmailData);
        });
    })
})