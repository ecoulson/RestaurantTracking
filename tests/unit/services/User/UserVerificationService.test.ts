import UserModel from "../../../../src/models/user/UserModel";
import TokenModel from "../../../../src/models/token/TokenModel";
import UserVerificationService from "../../../../src/services/User/UserVerificationService";
import Scope from "../../../../src/services/Token/Scope";
import UserGenerator from "../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../mocks/Generators/TokenGenerator";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

beforeEach(() => {
    tokenGenerator.setScope([Scope.VerifyEmail]);
})

describe("User Verification Service Suite", () => {
    describe("verify", () => {
        test("Error occured while finding user by email", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("No user with email", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`No user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("User is already verified", async () => {
            userGenerator.setVerified();
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`User with email ${user.email} is already verified`))
            }
            expect.assertions(1);
        });

        test("Error occured while finding email verification token", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockRejectedValue(new Error());

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find tokens associated with user ${user._id}`));
            }
            expect.assertions(1);
        });

        test("No verification tokens associated with the user", async () => {
            const user = userGenerator.generate();
            tokenGenerator.setScope([Scope.ResetPassword]);
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`User ${user._id} has no active email verification tokens`));
            }
            expect.assertions(1);
        });

        test("Token does not match the database value", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            try {
                await service.verify("fake token", user.email);
            } catch (error) {
                expect(error).toEqual(new Error("Incorrect verification token provided"));
            }
            expect.assertions(1);
        });

        test("Fails to verify user in database", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            UserModel.prototype.save = jest.fn().mockRejectedValue(new Error());

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to update verification status of user ${user._id}`));
            }
            expect.assertions(1);
        });

        test("Fails to delete email verification token", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            UserModel.prototype.save = jest.fn();
            TokenModel.prototype.remove = jest.fn().mockRejectedValue(new Error())

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to delete verification token for user ${user._id}`));
            }
            expect.assertions(1);
        });

        test("Verifies user", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            UserModel.prototype.save = jest.fn();
            TokenModel.prototype.remove = jest.fn()

            const verifiedUser = await service.verify(token.value, user.email);

            // update the expected user to be verified
            user.verified = true;
            expect(verifiedUser.serialize()).toEqual(user.serialize());
        });
    })
})