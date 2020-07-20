import UserVerificationStrategy from "../../../../../src/services/User/Verification/UserVerificationStrategy";
import Scope from "../../../../../src/services/Token/Scope";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator";
import UserVerificationService from "../../../../../src/services/User/Verification/UserVerificationService";
import UserBroker from "../../../../../src/brokers/UserBroker";
import TokenBroker from "../../../../../src/brokers/TokenBroker";

const userGenerator = new UserGenerator();
const tokenGenerator = new TokenGenerator();

beforeEach(() => {
    tokenGenerator.setScope([Scope.VerifyEmail]);
})

describe("User Verification Service Suite", () => {
    describe("verify", () => {
        test("No user with email", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserBroker.prototype.findUserByEmail = jest.fn().mockResolvedValue(null);

            try {
                await service.verify(new UserVerificationStrategy(
                    new UserBroker(),
                    new TokenBroker(),
                    token.value,
                    user.email
                ))
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
            UserBroker.prototype.findUserByEmail = jest.fn().mockResolvedValue(user);

            try {
                await service.verify(new UserVerificationStrategy(
                    new UserBroker(),
                    new TokenBroker(),
                    token.value,
                    user.email
                ))
            } catch (error) {
                expect(error).toEqual(new Error(`User with email ${user.email} is already verified`))
            }
            expect.assertions(1);
        });

        test("Token does not match the database value", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserBroker.prototype.findUserByEmail = jest.fn().mockResolvedValue(user);
            TokenBroker.prototype.getTokens = jest.fn().mockResolvedValue([token]);
            UserBroker.prototype.save = jest.fn().mockResolvedValue(user);
            TokenBroker.prototype.remove = jest.fn();

            try {
                await service.verify(new UserVerificationStrategy(
                    new UserBroker(),
                    new TokenBroker(),
                    "fake",
                    user.email
                ))
            } catch (error) {
                expect(error).toEqual(new Error("Incorrect verification token provided"));
            }
            expect.assertions(1);
        });

        test("Verifies user", async () => {
            const user = userGenerator.generate();
            const token = tokenGenerator.generate();
            const service = new UserVerificationService();
            UserBroker.prototype.findUserByEmail = jest.fn().mockResolvedValue(user);
            TokenBroker.prototype.getTokens = jest.fn().mockResolvedValue([token]);
            UserBroker.prototype.save = jest.fn().mockResolvedValue(user);
            TokenBroker.prototype.remove = jest.fn();

            const verifiedUser = await service.verify(new UserVerificationStrategy(
                new UserBroker(),
                new TokenBroker(),
                token.value,
                user.email
            ))

            // update the expected user to be verified
            user.verified = true;
            expect(verifiedUser.serialize()).toEqual(user.serialize());
        });
    })
})