jest.mock("../../../../src/services/Token/TokenService");
jest.mock("../../../../src/lib/Email/PasswordRecoveryEmail");
import PasswordRecoveryService from "../../../../src/services/User/PasswordRecoveryService";
import UserGenerator from "../../../mocks/Generators/UserGenerator";
import UserModel from "../../../../src/models/user/UserModel";
import TokenService from "../../../../src/services/Token/TokenService";
import EmailData from "../../../../src/lib/Email/EmailData";
import PasswordRecoveryEmailMessage from "../../../../src/lib/Email/PasswordRecoveryEmailMessage";
import PasswordRecoveryEmail from "../../../../src/lib/Email/PasswordRecoveryEmail";

const userGenerator = new UserGenerator();

beforeEach(() => {
    jest.resetAllMocks();
})

describe("Password Recovery Service", () => {
    describe("sendForgotPasswordEmail", () => {
        test("Fails to find user with email", async () => {
            const user = userGenerator.generate();
            const service = new PasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());

            try {
                await service.sendForgotPasswordEmail(user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("No user with email", async () => {
            const user = userGenerator.generate();
            const service = new PasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.sendForgotPasswordEmail(user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`No user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("Removes exisiting forgot password token", async () => {
            const user = userGenerator.generate();
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
            const user = userGenerator.generate();
            const service = new PasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            await service.sendForgotPasswordEmail(user.email);

            expect(TokenService.prototype.deleteExisitingToken).toHaveBeenCalledWith(user)
        })

        test("Generates new forgot password token", async () => {
            const user = userGenerator.generate();
            const service = new PasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            await service.sendForgotPasswordEmail(user.email);

            expect(TokenService.prototype.generate).toHaveBeenCalledWith(user);
        });

        test("Sends forgot password email", async () => {
            const user = userGenerator.generate();
            const service = new PasswordRecoveryService();
            const expectedEmailData = new EmailData(
                new PasswordRecoveryEmailMessage(user.email).getMessage()
            )
            PasswordRecoveryEmail.prototype.send = jest.fn().mockResolvedValue(expectedEmailData)   
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            const data = await service.sendForgotPasswordEmail(user.email);

            expect(data).toEqual(expectedEmailData);
        });
    })
})