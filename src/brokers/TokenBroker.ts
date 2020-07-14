import IUser from "../models/user/IUser";
import TokenModel from "../models/token/TokenModel";
import IToken from "../models/token/IToken";

export default class TokenBroker {
    async getTokens(user : IUser) {
        try {
            return await TokenModel.findByUserId(user.id);
        } catch (error) {
            throw new Error(`Error finding verification tokens for user email ${user.email}`)
        }
    }

    async remove(token : IToken) {
        try {
            await token.remove();
        } catch (error) {
            throw new Error(`Failed to remove token ${token.id} from database`);
        }
    }
}