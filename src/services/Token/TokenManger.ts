import TokenBroker from "../../brokers/TokenBroker";

export default class TokenManager {
    private tokenBroker : TokenBroker

    constructor(tokenBroker : TokenBroker) {
        this.tokenBroker = tokenBroker;
    }

    async run() {
        const tokens = await this.tokenBroker.findExpiredTokens();
        tokens.forEach(async (token) => {
            await this.tokenBroker.remove(token)
        })
    }
}