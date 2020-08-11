import OrganizationAccountVerificationStrategy from "../../../../../src/services/Organization/OrganizationAccount/OrganizationAccountVerificationStrategy"
import UserBroker from "../../../../../src/brokers/UserBroker"
import faker from "faker";
import { generateObjectId } from "../../../../helpers/mongo";
import EncryptedTokenService from "../../../../../src/services/Token/EncryptedTokenService";
import Scope from "../../../../../src/services/Token/Scope";
import TokenBroker from "../../../../../src/brokers/TokenBroker";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

describe("Organization Account Verification Strategy", () => {
    test("No user found with email", async () => {
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(null);
        const email = faker.internet.email()
        const strategy = new OrganizationAccountVerificationStrategy(
            new UserBroker(),
            email,
            generateObjectId(),
            new EncryptedTokenService(
                [Scope.VerifyEmail], 1, new TokenBroker()
            ),
            new TokenBroker()
        )

        try {
            await strategy.verify()
        } catch (error) {
            expect(error).toEqual(
                new Error(`No user with email ${email}`)
            )
        }

        expect.assertions(1);
    })

    test("No verification tokens found for user", async () => {
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(userGenerator.generate());
        TokenBroker.prototype.getTokens =
            jest.fn().mockResolvedValue([]);
        const email = faker.internet.email()
        const strategy = new OrganizationAccountVerificationStrategy(
            new UserBroker(),
            email,
            generateObjectId(),
            new EncryptedTokenService(
                [Scope.VerifyEmail], 1, new TokenBroker()
            ),
            new TokenBroker()
        )

        try {
            await strategy.verify()
        } catch (error) {
            expect(error).toEqual(
                new Error(`No verification tokens for user with email: ${email}`)
            )
        }

        expect.assertions(1);
    })

    test("Decrypted token does not have a code in it", async () => {
        tokenGenerator.setScope([ Scope.VerifyEmail ])
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(userGenerator.generate());
        TokenBroker.prototype.getTokens =
            jest.fn().mockResolvedValue([
                tokenGenerator.generate()
            ]);
        EncryptedTokenService.prototype.decryptToken =
            jest.fn().mockImplementation(x => new Map())
        const email = faker.internet.email()
        const strategy = new OrganizationAccountVerificationStrategy(
            new UserBroker(),
            email,
            generateObjectId(),
            new EncryptedTokenService(
                [Scope.VerifyEmail], 1, new TokenBroker()
            ),
            new TokenBroker()
        )

        try {
            await strategy.verify()
        } catch (error) {
            expect(error).toEqual(
                new Error("Failed to verify user, incorrect verification code")
            )
        }

        expect.assertions(1);
    })

    test("Verifies account", async () => {
        tokenGenerator.setScope([ Scope.VerifyEmail ])
        const token = tokenGenerator.generate();
        const code = generateObjectId();
        const user = userGenerator.generate();
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(user);
        UserBroker.prototype.save = jest.fn().mockResolvedValue(user);
        TokenBroker.prototype.getTokens =
            jest.fn().mockResolvedValue([ token ]);
        EncryptedTokenService.prototype.deleteExistingToken = jest.fn();
        EncryptedTokenService.prototype.decryptToken =
            jest.fn().mockResolvedValue(new Map([
                ["code", code]
            ]))
        const email = faker.internet.email()
        const strategy = new OrganizationAccountVerificationStrategy(
            new UserBroker(),
            email,
            code,
            new EncryptedTokenService(
                [Scope.VerifyEmail], 1, new TokenBroker()
            ),
            new TokenBroker()
        )

        const foundUser = await strategy.verify()

        expect(foundUser.verified).toBeTruthy()
    })
})