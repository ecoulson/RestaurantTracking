import CancelPasswordRecoveryService from "../../../../../src/services/User/PasswordRecovery/CancelPasswordRecoveryService"
import UserGenerator from "../../../../mocks/Generators/UserGenerator"
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import UserModel from "../../../../../src/models/user/UserModel";
import TokenModel from "../../../../../src/models/token/TokenModel";
import Scope from "../../../../../src/services/Token/Scope";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Cancel Password Recovery Suite", () => {
    describe("cancel", () => {
        test("DB error when finding users with email", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new CancelPasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());

            try {
                await service.cancel(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find user with email ${user.email}`));
            }
            expect.assertions(1);
        })

        test("No user with email", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new CancelPasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.cancel(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(new Error(`No user with email ${user.email}`));
            }
            expect.assertions(1);
        })

        test("DB error when finding tokens by user id", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new CancelPasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockRejectedValue(new Error())

            try {
                await service.cancel(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find tokens by user id ${user.id}`));
            }
            expect.assertions(1);
        })

        test("No tokens associated with user id", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new CancelPasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([]);

            try {
                await service.cancel(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(new Error(`No recovery password token associated with ${user._id}`));
            }
            expect.assertions(1);
        })

        test("DB error when removing token", async () => {
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.ResetPassword])
            const token = tokenGenerator.generate();
            const service = new CancelPasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            TokenModel.prototype.remove = jest.fn().mockRejectedValue(new Error());

            try {
                await service.cancel(user.email, token.value);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to remove recovery password token ${token._id}`));
            }
            expect.assertions(1);
        });

        test("Cancels password reset", async () => {
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.ResetPassword])
            const token = tokenGenerator.generate();
            const service = new CancelPasswordRecoveryService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            TokenModel.prototype.remove = jest.fn();

            const canceled = await service.cancel(user.email, token.value);

            expect(canceled).toBeTruthy();
        });
    })
})