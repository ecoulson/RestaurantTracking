jest.mock("crypto");
import EmailVerificationTokenService from "../../../../src/services/Token/EmailVerificationTokenService"
import faker from "faker";
import Chance from "chance";
import UserModel from "../../../../src/models/user/UserModel";
import crypto from "crypto"
import TokenModel from "../../../../src/models/token/TokenModel";
import Scope from "../../../../src/services/Token/Scope";
import { generateObjectId } from "../../../helpers/mongo";

const chance = new Chance();

beforeEach(() => jest.resetAllMocks());

describe("Email Verification Token Service", () => {
    describe("generate", () => {
        test("Fails to save token to database", async () => {
            const tokenValue = chance.hash({ length: 38});
            (crypto.randomBytes as jest.Mock).mockImplementation(() => { return { toString: () => tokenValue } });
            TokenModel.prototype.save = jest.fn().mockRejectedValue(new Error());
            const user = getUser(faker.internet.password());
            const service = new EmailVerificationTokenService();

            try {
                await service.generate(user);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to save email verification token to database for ${user._id}`)
                );
            }
            expect.assertions(1);
        })

        test("Fails to generate a token", async () => {
            (crypto.randomBytes as jest.Mock).mockImplementation(() => { throw new Error(); });
            const user = getUser(faker.internet.password());
            const service = new EmailVerificationTokenService();

            try {
                await service.generate(user);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to generate email verification token for ${user._id}`)
                );
            }
            expect.assertions(1);
        })

        test("Successfully generates a token", async () => {
            const date = new Date();
            const tokenValue = chance.hash({ length: 38});
            const user = getUser(faker.internet.password());
            const testToken = getToken(tokenValue, date, user._id);
            (crypto.randomBytes as jest.Mock).mockImplementation(() => { return { toString: () => tokenValue } });
            TokenModel.prototype.save = jest.fn();
            const service = new EmailVerificationTokenService();

            const token = await service.generate(user);

            expect(token.expiresAt.getDate()).toEqual(testToken.expiresAt.getDate())
            expect(token.value).toEqual(testToken.value);
            expect(token.scope[0]).toEqual(testToken.scope[0]);
            expect(token.userId).toEqual(testToken.userId);
        })
    });

    describe("Delete existing verification token", () => {
        test("Fails to get tokens by userId", async () => {
            TokenModel.findByUserId = jest.fn().mockRejectedValue(new Error());
            const service = new EmailVerificationTokenService();
            const user = getUser(faker.internet.password());

            try {
                await service.deleteExisitingVerificationToken(user);
            } catch (error) {
                expect(error).toEqual(new Error(`Failed to find tokens associatied with user ${user._id}`))
            }
            expect.assertions(1);
        });

        test("No tokens associaited with user", async () => {
            TokenModel.findByUserId = jest.fn().mockResolvedValue([]);
            const service = new EmailVerificationTokenService();
            const mockUser = getUser(faker.internet.password());

            const verificationToken = await service.deleteExisitingVerificationToken(mockUser);

            expect(verificationToken).toEqual(null);
        });

        test("No token with email verification scope", async () => {
            const token = getToken();
            token.scope = [];
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            const service = new EmailVerificationTokenService();
            const mockUser = getUser(faker.internet.password());

            const verificationToken = await service.deleteExisitingVerificationToken(mockUser);

            expect(verificationToken).toEqual(null);
        })

        test("No tokens with email verification scope", async () => {
            const token = getToken();
            token.scope = [];
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token, token]);
            const service = new EmailVerificationTokenService();
            const mockUser = getUser(faker.internet.password());

            const verificationToken = await service.deleteExisitingVerificationToken(mockUser);

            expect(verificationToken).toEqual(null);
        })

        test("Token with email verification scope", async () => {
            const token = getToken();
            const token2 = getToken();
            token.scope = [Scope.ForgotPassword];
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token, token2]);
            TokenModel.prototype.remove = jest.fn();
            const service = new EmailVerificationTokenService();
            const mockUser = getUser(faker.internet.password());

            const verificationToken = await service.deleteExisitingVerificationToken(mockUser);

            expect(verificationToken).toEqual(token2);
        });
        
        test("An error occured while deleting the token from the database", async () => {
            const token = getToken();
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            TokenModel.prototype.remove = jest.fn().mockRejectedValue(new Error())
            const service = new EmailVerificationTokenService();
            const mockUser = getUser(faker.internet.password());

            try {
                await service.deleteExisitingVerificationToken(mockUser);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to remove token with id ${token._id}`)
                );
            }
            expect.assertions(1);
        });
    })
})

function getUser(password: string) {
    return new UserModel({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: password
    })
};

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