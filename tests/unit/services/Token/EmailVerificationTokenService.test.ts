jest.mock("crypto");
import EmailVerificationTokenService from "../../../../src/services/Token/EmailVerificationTokenService";
import Chance from "chance";
import crypto from "crypto"
import TokenModel from "../../../../src/models/token/TokenModel";
import Scope from "../../../../src/services/Token/Scope";
import TokenGenerator from "../../../mocks/Generators/TokenGenerator";
import UserGenerator from "../../../mocks/Generators/UserGenerator";

const chance = new Chance();

const tokenGenerator = new TokenGenerator();
const userGenerator = new UserGenerator();

beforeEach(() => {
    jest.resetAllMocks()
    tokenGenerator.setScope([Scope.VerifyEmail]);
});

describe("Email Verification Token Service", () => {
    describe("generate", () => {
        test("Fails to save token to database", async () => {
            const tokenValue = chance.hash({ length: 38});
            const user = userGenerator.generate();
            const service = new EmailVerificationTokenService();
            (crypto.randomBytes as jest.Mock).mockImplementation(() => { return { toString: () => tokenValue } });
            TokenModel.prototype.save = jest.fn().mockRejectedValue(new Error());

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
            const user = userGenerator.generate();
            const service = new EmailVerificationTokenService();
            (crypto.randomBytes as jest.Mock).mockImplementation(() => { throw new Error(); });

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
            const user = userGenerator.generate();
            tokenGenerator.setValue(chance.hash({ length: 38 }));
            tokenGenerator.setUserId(user._id);
            tokenGenerator.setDateCreated(new Date());
            const testToken = tokenGenerator.generate();
            const service = new EmailVerificationTokenService();
            (crypto.randomBytes as jest.Mock).mockImplementation(() => { return { toString: () => testToken.value } });
            TokenModel.prototype.save = jest.fn();

            const token = await service.generate(user);

            expect(token.expiresAt.getDate()).toEqual(testToken.expiresAt.getDate())
            expect(token.value).toEqual(testToken.value);
            expect(token.scope[0]).toEqual(testToken.scope[0]);
            expect(token.userId).toEqual(testToken.userId);
        })
    });

    describe("Delete existing verification token", () => {
        test("Fails to get tokens by userId", async () => {
            const service = new EmailVerificationTokenService();
            const user = userGenerator.generate();
            TokenModel.findByUserId = jest.fn().mockRejectedValue(new Error());

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
            const user = userGenerator.generate();

            const verificationToken = await service.deleteExisitingVerificationToken(user);

            expect(verificationToken).toEqual(null);
        });

        test("No token with email verification scope", async () => {
            tokenGenerator.setScope([Scope.ForgotPassword]);
            const token = tokenGenerator.generate();
            const service = new EmailVerificationTokenService();
            const user = userGenerator.generate();
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);

            const verificationToken = await service.deleteExisitingVerificationToken(user);

            expect(verificationToken).toEqual(null);
        })

        test("No tokens with email verification scope", async () => {
            tokenGenerator.setScope([Scope.ForgotPassword]);
            const token = tokenGenerator.generate();
            const service = new EmailVerificationTokenService();
            const user = userGenerator.generate();
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token, token]);

            const verificationToken = await service.deleteExisitingVerificationToken(user);

            expect(verificationToken).toEqual(null);
        })

        
        test("An error occured while deleting the token from the database", async () => {
            const token = tokenGenerator.generate();
            const service = new EmailVerificationTokenService();
            const user = userGenerator.generate();
            TokenModel.findByUserId = jest.fn().mockResolvedValue([token]);
            TokenModel.prototype.remove = jest.fn().mockRejectedValue(new Error())
            
            try {
                await service.deleteExisitingVerificationToken(user);
            } catch (error) {
                expect(error).toEqual(
                    new Error(`Failed to remove token with id ${token._id}`)
                    );
                }
                expect.assertions(1);
            });
        })

        test("Token with email verification scope", async () => {
            tokenGenerator.setScope([Scope.ForgotPassword]);
            const forgotPasswordToken = tokenGenerator.generate();
            tokenGenerator.setScope([Scope.VerifyEmail]);
            const expectedVerificationToken = tokenGenerator.generate();
            const service = new EmailVerificationTokenService();
            const user = userGenerator.generate();
            TokenModel.findByUserId = jest.fn().mockResolvedValue([forgotPasswordToken, expectedVerificationToken]);
            TokenModel.prototype.remove = jest.fn();
            
            const verificationToken = await service.deleteExisitingVerificationToken(user);

            expect(verificationToken).toEqual(expectedVerificationToken);
        });
})