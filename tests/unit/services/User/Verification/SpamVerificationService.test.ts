import SpamVerificationService from "../../../../../src/services/User/Verification/SpamVerificationService";
import UserModel from "../../../../../src/models/user/UserModel";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import TokenModel from "../../../../../src/models/token/TokenModel";
import Scope from "../../../../../src/services/Token/Scope";
import EmailData from "../../../../../src/lib/Email/EmailData";
import EmailMessageBuilder from "../../../../../src/lib/Email/EmailMessageBuilder";
import Email from "../../../../../src/lib/Email/Email";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Spam Verification Service", () => {
    describe("cancelAccount", () => {
        test("No user with email", async () => {
            const service = new SpamVerificationService();
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.cancelAccount(user.email, token.value)
            } catch (error) {
                expect(error).toEqual(new Error(`No user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("User is verified", async () => {
            const service = new SpamVerificationService();
            userGenerator.setVerified();
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            try {
                await service.cancelAccount(user.email, token.value)
            } catch (error) {
                expect(error).toEqual(new Error(`User with email ${user.email} is already verified`))
            }
            expect.assertions(1);
        });

        test("Error finding verification token", async () => {
            const service = new SpamVerificationService();
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.ResetPassword]);
            const token = tokenGenerator.generate();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockRejectedValue(new Error());

            try {
                await service.cancelAccount(user.email, token.value);
            } catch(error) {
                expect(error).toEqual(new Error(`Error finding verification tokens for user email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("User has no verification token", async () => {
            const service = new SpamVerificationService();
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.ResetPassword]);
            const token = tokenGenerator.generate();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.cancelAccount(user.email, token.value);
            } catch(error) {
                expect(error).toEqual(new Error(`User with ${user.email} has no verification tokens`))
            }
            expect.assertions(1);
        });

        test("Token values do not match", async () => {
            const service = new SpamVerificationService();
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.VerifyEmail]);
            const token = tokenGenerator.generate();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.cancelAccount(user.email, "invalid");
            } catch(error) {
                expect(error).toEqual(new Error(`Token values do not match`))
            }
            expect.assertions(1);
        })

        test("Fails to delete token from system", async () => {
            const service = new SpamVerificationService();
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.VerifyEmail]);
            const token = tokenGenerator.generate();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            TokenModel.prototype.remove = jest.fn().mockRejectedValue(new Error());
            try {
                await service.cancelAccount(user.email, token.value);
            } catch(error) {
                expect(error).toEqual(new Error(`Failed to remove token ${token.id} from database`))
            }
            expect.assertions(1);
        });

        test("Sends spam email", async () => {
            const service = new SpamVerificationService();
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.VerifyEmail]);
            const token = tokenGenerator.generate();
            const expectedEmailData = new EmailData(new EmailMessageBuilder().build().getMessage())
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            TokenModel.prototype.remove = jest.fn();
            UserModel.prototype.remove = jest.fn();
            Email.prototype.send = jest.fn().mockResolvedValue(expectedEmailData);

            const emailData = await service.cancelAccount(user.email, token.value);

            expect(emailData).toEqual(expectedEmailData)
        });
    })
})