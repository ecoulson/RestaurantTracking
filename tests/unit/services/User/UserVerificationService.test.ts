import UserModel from "../../../../src/models/user/UserModel";
import TokenModel from "../../../../src/models/token/TokenModel";
import faker from "faker"
import UserVerificationService from "../../../../src/services/User/UserVerificationService";
import { generateObjectId } from "../../../helpers/mongo";
import Scope from "../../../../src/services/Token/Scope";
import bcrypt from "bcrypt"

describe("User Verification Service Suite", () => {
    describe("verify", () => {
        test("Error occured while finding user by email", async () => {
            UserModel.findByEmail = jest.fn().mockRejectedValue(new Error());
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserVerificationService();

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("No user with email", async () => {
            UserModel.findByEmail = jest.fn().mockResolvedValue(null);
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserVerificationService();

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`No user with email ${user.email}`))
            }
            expect.assertions(1);
        });

        test("User is already verified", async () => {
            const user = getUser(faker.internet.password());
            user.verified = true;
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            const token = getToken();
            const service = new UserVerificationService();

            try {
                await service.verify(token.value, user.email);
            } catch (error) {
                expect(error).toEqual(new Error(`User with email ${user.email} is already verified`))
            }
            expect.assertions(1);
        });

        test("Error occured while finding email verification token", async () => {
            const user = getUser(faker.internet.password());
            const token = getToken();
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
            const user = getUser(faker.internet.password());
            const token = getToken();
            token.scope = [Scope.ForgotPassword];
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
            const user = getUser(faker.internet.password());
            const token = getToken();
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
            const user = getUser(faker.internet.password());
            const token = getToken();
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
            const user = getUser(faker.internet.password());
            const token = getToken();
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
            const user = getUser(faker.internet.password());
            const token = getToken();
            const service = new UserVerificationService();
            UserModel.findByEmail = jest.fn().mockResolvedValue(user);
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            UserModel.prototype.save = jest.fn();
            TokenModel.prototype.remove = jest.fn()

            const verifiedUser = await service.verify(token.value, user.email);

            user.verified = true;
            expect(verifiedUser.serialize()).toEqual(user.serialize());
        });
    })
})


function getUser(password: string) {
    return new UserModel({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync(password, 1)
    })
}

function getToken(value?: string, date? : Date, userId? : string) {
    const token = new TokenModel({
        value,
        createdAt: date ? date : new Date(),
        expiresAt: new Date(),
        userId: userId ? userId : generateObjectId(),
        updatedAt: date ? date : new Date(),
        scope: [Scope.VerifyEmail]
    })
    const expirationDate = new Date(token.createdAt.valueOf());
    expirationDate.setDate(token.createdAt.getDate() + 1);

    token.expiresAt = expirationDate
    return token
}