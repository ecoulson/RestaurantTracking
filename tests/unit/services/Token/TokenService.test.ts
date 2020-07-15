jest.mock("crypto");
import TokenService from "../../../../src/services/Token/TokenService";
import Chance from "chance";
import crypto from "crypto"
import TokenModel from "../../../../src/models/token/TokenModel";
import Scope from "../../../../src/services/Token/Scope";
import TokenGenerator from "../../../mocks/Generators/TokenGenerator";
import UserGenerator from "../../../mocks/Generators/UserGenerator";
import TokenBroker from "../../../../src/brokers/TokenBroker";

const chance = new Chance();

const tokenGenerator = new TokenGenerator();
const userGenerator = new UserGenerator();

const scope = [Scope.VerifyEmail];
const hours = 24;

beforeEach(() => {
    jest.resetAllMocks()
    tokenGenerator.setScope([Scope.VerifyEmail]);
});

describe("Email Verification Token Service", () => {
    describe("generate", () => {
        test("Successfully generates a token", async () => {
            const user = userGenerator.generate();
            const date = new Date();
            tokenGenerator.setValue(chance.hash({ length: 38 }));
            tokenGenerator.setUserId(user._id);
            tokenGenerator.setDateCreated(date);
            const expirationDate = new Date(date.valueOf());
            expirationDate.setDate(date.getDate() + 1)
            tokenGenerator.setExpiresAt(expirationDate);
            const testToken = tokenGenerator.generate();
            const service = new TokenService(scope, hours);
            (crypto.randomBytes as jest.Mock).mockImplementation(() => { return { toString: () => testToken.value } });
            TokenBroker.prototype.save = jest.fn();

            const token = await service.generate(user);

            expect(token.expiresAt.getDate()).toEqual(testToken.expiresAt.getDate())
            expect(token.value).toEqual(testToken.value);
            expect(token.scope[0]).toEqual(testToken.scope[0]);
            expect(token.userId).toEqual(testToken.userId);
        })
    });

    describe("Delete existing verification token", () => {
        test("No tokens associated with user", async () => {
            TokenBroker.prototype.getTokens = jest.fn().mockResolvedValue([]);
            const service = new TokenService(scope, hours);
            const user = userGenerator.generate();

            const verificationToken = await service.deleteExistingToken(user);

            expect(verificationToken).toEqual(null);
        });

        test("No token with email verification scope", async () => {
            tokenGenerator.setScope([Scope.ResetPassword]);
            const token = tokenGenerator.generate();
            const service = new TokenService(scope, hours);
            const user = userGenerator.generate();
            TokenBroker.prototype.getTokens = jest.fn().mockResolvedValue([token]);

            const verificationToken = await service.deleteExistingToken(user);

            expect(verificationToken).toEqual(null);
        })

        test("No tokens with email verification scope", async () => {
            tokenGenerator.setScope([Scope.ResetPassword]);
            const token = tokenGenerator.generate();
            const service = new TokenService(scope, hours);
            const user = userGenerator.generate();
            TokenBroker.prototype.getTokens = jest.fn().mockResolvedValue([token, token]);

            const verificationToken = await service.deleteExistingToken(user);

            expect(verificationToken).toEqual(null);
        })

        test("Token with email verification scope", async () => {
            tokenGenerator.setScope([Scope.ResetPassword]);
            const forgotPasswordToken = tokenGenerator.generate();
            tokenGenerator.setScope([Scope.VerifyEmail]);
            const expectedVerificationToken = tokenGenerator.generate();
            const service = new TokenService(scope, hours);
            const user = userGenerator.generate();
            TokenBroker.prototype.getTokens = jest.fn().mockResolvedValue([forgotPasswordToken, expectedVerificationToken]);
            TokenModel.prototype.remove = jest.fn();
            
            const verificationToken = await service.deleteExistingToken(user);

            expect(verificationToken).toEqual(expectedVerificationToken);
        })
    });
})