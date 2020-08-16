import UserBroker from "../../../../../src/brokers/UserBroker"
import TokenBroker from "../../../../../src/brokers/TokenBroker"
import TokenGenerator from "../../../../mocks/Generators/TokenGenerator"
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import UserVerificationStrategy from "../../../../../src/services/User/Verification/UserVerificationStrategy";
import Scope from "../../../../../src/services/Token/Scope";

const tokenGenerator = new TokenGenerator();
const userGenerator = new UserGenerator();

describe("User Verification Strategy", () => {
    test("No user exists", async () => {
        const token = tokenGenerator.generate();
        const user = userGenerator.generate();
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(null);
        const strategy = new UserVerificationStrategy(
            new UserBroker(),
            new TokenBroker(),
            token.value,
            user.email
        )

        try {
            await strategy.verify();
        } catch (error) {
            expect(error)
                .toEqual(new Error(`No user with email ${user.email}`))
        }

        expect.assertions(1);
    })

    test("User is already verified", async () => {
        userGenerator.setVerified()
        const token = tokenGenerator.generate();
        const user = userGenerator.generate();
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(user);
        const strategy = new UserVerificationStrategy(
            new UserBroker(),
            new TokenBroker(),
            token.value,
            user.email
        )

        try {
            await strategy.verify();
        } catch (error) {
            expect(error).toEqual(new Error(
                `User with email ${user.email} is already verified`
            ))
        }

        expect.assertions(1);
    })

    test("No verification tokens associated with user", async () => {
        const token = tokenGenerator.generate();
        const user = userGenerator.generate();
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(user);
        TokenBroker.prototype.getTokens = 
            jest.fn().mockResolvedValue([])
        const strategy = new UserVerificationStrategy(
            new UserBroker(),
            new TokenBroker(),
            token.value,
            user.email
        )

        try {
            await strategy.verify();
        } catch (error) {
            expect(error)
                .toEqual(new Error(
                    `No verification tokens associated with ${user.id}`
                ))
        }

        expect.assertions(1);
    })

    test("Incorrect token value", async () => {
        tokenGenerator.setScope([Scope.VerifyEmail])
        const token = tokenGenerator.generate();
        const user = userGenerator.generate();
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(user);
        TokenBroker.prototype.getTokens = 
            jest.fn().mockResolvedValue([token])
        const strategy = new UserVerificationStrategy(
            new UserBroker(),
            new TokenBroker(),
            "foo",
            user.email
        )

        try {
            await strategy.verify();
        } catch (error) {
            expect(error)
                .toEqual(new Error(
                    `Incorrect verification token provided`
                ))
        }

        expect.assertions(1);
    })

    test("Verify user", async () => {
        tokenGenerator.setScope([Scope.VerifyEmail])
        const token = tokenGenerator.generate();
        const user = userGenerator.generate();
        UserBroker.prototype.findUserByEmail = 
            jest.fn().mockResolvedValue(user);
        TokenBroker.prototype.getTokens = 
            jest.fn().mockResolvedValue([token])
        TokenBroker.prototype.remove = jest.fn();
        UserBroker.prototype.save = 
            jest.fn().mockImplementation(x => x)
        const strategy = new UserVerificationStrategy(
            new UserBroker(),
            new TokenBroker(),
            token.value,
            user.email
        )

        const verifiedUser = await strategy.verify();

        expect(verifiedUser.verified).toBeTruthy()
    })
})