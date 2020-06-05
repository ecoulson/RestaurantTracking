import ModelMethods from "../ModelMethods";
import IToken from "./IToken";

export default class TokenMethods {
    static serialize() {
        const context = ModelMethods.getContext<IToken>(this);
        return {
            _id: context._id,
            userId: context.userId,
            createdAt: context.createdAt,
            value: context.value,
            refreshToken: context.refreshToken,
            expiresAt: context.expiresAt,
            updatedAt: context.updatedAt,
            scope: Array.from(context.scope),
            schemaVersion: context.schemaVersion
        }
    }
}