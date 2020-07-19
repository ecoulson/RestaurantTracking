import ITokenSchema from "./ITokenSchema";

export default interface IToken extends ITokenSchema {
    serialize() : IToken;
}