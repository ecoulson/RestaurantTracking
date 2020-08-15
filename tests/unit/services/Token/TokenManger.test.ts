import TokenBroker from "../../../../src/brokers/TokenBroker"
import TokenManager from "../../../../src/services/Token/TokenManger";
import TokenGenerator from "../../../mocks/Generators/TokenGenerator";

const tokenGenerator = new TokenGenerator();

describe("Token Manager Suite", () => {
    test("Removes expired tokens", async () => {
        const token = tokenGenerator.generate();
        TokenBroker.prototype.findExpiredTokens = 
            jest.fn().mockResolvedValue([token])
        TokenBroker.prototype.remove = jest.fn();
        const manager = new TokenManager(new TokenBroker());

        await manager.run();

        expect(TokenBroker.prototype.remove).toHaveBeenCalledWith(token)
    })
})  