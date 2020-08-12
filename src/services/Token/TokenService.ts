import IUser from "../../models/User/IUser";
import crypto from "crypto"
import TokenModel from "../../models/Token/TokenModel";
import IToken from "../../models/Token/IToken";
import Scope from "./Scope";
import ITokenService from "./ITokenService";
import TokenBroker from "../../brokers/TokenBroker";

const NumberOfBytes = 38

export default class TokenService implements ITokenService {
    private scopes : Scope[];
    private tokenLifeTime : number;
    private tokenBroker : TokenBroker;

    constructor(scopes : Scope[], hours : number, tokenBroker : TokenBroker) {
        this.scopes = scopes;
        this.tokenBroker = tokenBroker
        this.tokenLifeTime = hours * 60 * 60 * 1000;
    }

    async generate(user : IUser) {
        const createdAt = new Date();
        const expirationDate = this.getExpirationDate(createdAt)
        const token = new TokenModel({
            userId: user._id,
            value: crypto.randomBytes(NumberOfBytes).toString("hex"),
            scope: this.scopes,
            createdAt: createdAt,
            updatedAt: createdAt,
            expiresAt: expirationDate
        });
        await this.tokenBroker.save(token);
        return token;
    }

    private getExpirationDate(date : Date) {
        const expirationDate = new Date(date.valueOf());
        expirationDate.setTime(date.getTime() + this.tokenLifeTime);
        return expirationDate;
    }

    async deleteExistingToken(user : IUser) {
        const tokens = await this.tokenBroker.getTokens(user);
        if (this.userHasTokens(tokens)) {
            return null;
        }
        const token = this.getScopedToken(tokens);
        if (!token) {
            return null;
        }
        await this.tokenBroker.remove(token);
        return token;
    }

    private userHasTokens(tokens : IToken[]) {
        return tokens.length === 0;
    }

    private getScopedToken(tokens : IToken[]) {
        for (let token of tokens) {
            if (this.areSameScope(token.scope)) {
                return token;
            }
        }
        return null;
    }

    private areSameScope(tokenScope : Scope[]) {
        if (tokenScope.length !== this.scopes.length) {
            return false;
        }
        for (let scope of tokenScope) {
            return this.scopes.includes(scope)
        }
    }

    async decryptToken(token : IToken) {
        return new Map<string, string>();
    }
}