import EncryptedTokenService from "../../../../src/services/Token/EncryptedTokenService"
import Scope from "../../../../src/services/Token/Scope"
import TokenBroker from "../../../../src/brokers/TokenBroker"
import UserGenerator from "../../../mocks/Generators/UserGenerator"

const userGenerator = new UserGenerator()

beforeAll(() => {
    process.env.ENCRYPT_TOKEN_KEY = "66f9380e754eba6188bb7d4c3decbf76d4494550fbfb3a6c8ec6bd15b0ea052c"
})

describe("Encrypted Token Service", () => {
    describe("generate()", () => {
        test("Generates a token", async () => {
            const user = userGenerator.generate();
            TokenBroker.prototype.save = jest.fn().mockImplementation(x => x);
            const service = new EncryptedTokenService(
                [Scope.VerifyEmail], 24, new TokenBroker()
            )

            const token = await service.generate(user, new Map([
                ["value", "foo"]
            ]))

            expect(token.userId).toEqual(user.id)
            expect(Array.from(token.scope)).toEqual([Scope.VerifyEmail])
        })
    })

    describe("decryptToken()", () => {
        test("Decrypt token", async () => {
            const user = userGenerator.generate();
            TokenBroker.prototype.save = jest.fn().mockImplementation(x => x);
            const service = new EncryptedTokenService(
                [Scope.VerifyEmail], 24, new TokenBroker()
            )
            const token = await service.generate(user, new Map([
                ["value", "foo"]
            ]))

            const values = await service.decryptToken(token);

            expect(values.get("value")).toEqual("foo")
        })
    })
})