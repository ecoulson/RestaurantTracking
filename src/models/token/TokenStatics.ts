import ModelStatics from "../ModelStatics";
import ITokenModel from "./ITokenModel";
import IToken from "./IToken";

export default class TokenStatics {
    static async findByUserId(userId : string) : Promise<IToken[]> {
        const context = ModelStatics.getContext<ITokenModel>(this);
        return await context.find({ userId })
    }

    static async findExpiredTokens() : Promise<IToken[]> {
        const context = ModelStatics.getContext<ITokenModel>(this);
        return await context.find({
            expiresAt: {
                $lt: new Date()
            }
        });
    }
}