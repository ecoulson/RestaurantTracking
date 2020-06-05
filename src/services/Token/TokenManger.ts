import TokenModel from "../../models/token/TokenModel";

export default class TokenManager {
    run() {
        return new Promise(async (resolve : () => void, reject : (error : Error) => void) => {
            const tokens = await TokenModel.findExpiredTokens();
            for (const token of tokens) {
                await token.remove();
            }
            return resolve();
        })
    }
}