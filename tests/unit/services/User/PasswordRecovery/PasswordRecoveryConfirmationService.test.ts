import PasswordRecoveryConfirmationService from "../../../../../src/services/User/PasswordRecovery/PasswordRecoveryConfirmationService"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import UserModel from "../../../../../src/models/user/UserModel";
import TokenModel from "../../../../../src/models/token/TokenModel";
import Scope from "../../../../../src/services/Token/Scope";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

beforeEach(() => {
    jest.resetAllMocks();
})

describe("Password Recovery Confirmation Service", () => {
    describe("confirm", () => {
        test("Failed to find user", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new PasswordRecoveryConfirmationService();
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());

            try {
                await service.confirm(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to find user by email ${user.email}`)
                );
            }
            expect.assertions(1);
        });

        test("No user with email", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new PasswordRecoveryConfirmationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.confirm(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`No user with email ${user.email}`)
                );
            }
            expect.assertions(1);
        });

        test("Failed to find tokens associated with user", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new PasswordRecoveryConfirmationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockRejectedValue(new Error());

            try {
                await service.confirm(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to find tokens for user with id ${user._id}`)
                );
            }
            expect.assertions(1);
        })

        test("No password reset tokens associated with user", async () => {
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.VerifyEmail])
            const token = tokenGenerator.generate();
            const service = new PasswordRecoveryConfirmationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.confirm(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`No password reset tokens associated with user ${user._id}`)
                );
            }
            expect.assertions(1);
        })

        test("Updates users password reset date", async () => {
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.ResetPassword])
            const token = tokenGenerator.generate();
            const service = new PasswordRecoveryConfirmationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            UserModel.prototype.save = jest.fn().mockRejectedValue(new Error());

            try {
                await service.confirm(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to update user ${user._id}'s password reset date`)
                );
            }
            expect.assertions(1);
        })

        test("Confirms the password reset", async () => {
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.ResetPassword])
            const token = tokenGenerator.generate();
            const service = new PasswordRecoveryConfirmationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            const confirmed = await service.confirm(user.email, token.value);
            
            expect(confirmed).toBeTruthy()
        })
    })
})