import IUser from "../models/User/IUser";
import TokenModel from "../models/Token/TokenModel";
import IToken from "../models/Token/IToken";

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

    async save(token : IToken) {
        try {
            return await token.save();
        } catch (error) {
            throw new Error(`Failed to save token ${token.id} from database`);
        }
    }
}