import ITokenService from "./ITokenService";
import IToken from "../../models/token/IToken";
import IUser from "../../models/user/IUser";
import crypto from "crypto";
import TokenBroker from "../../brokers/TokenBroker";
import TokenModel from "../../models/token/TokenModel";
import Scope from "./Scope";

export default class EncryptedTokenService implements ITokenService {
    private algorithm : string;
    private tokenBroker : TokenBroker;
    private scopes : Scope[];
    private tokenLifeTime: number;

    constructor(scopes: Scope[], tokenLifeTime : number, tokenBroker : TokenBroker) {
        this.tokenLifeTime = tokenLifeTime * 60 * 60 * 1000;
        this.tokenBroker = tokenBroker;
        this.scopes = scopes;
        this.algorithm = 'aes-256-cbc';
    }

    async generate(user : IUser, values : Map<string, string>): Promise<IToken> {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(process.env.ENCRYPT_TOKEN_KEY, 'hex'), iv);
        let encrypted = cipher.update(JSON.stringify(this.mapToJSON(values)))
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        const createdAt = new Date();
        const token = new TokenModel({
            userId: user._id,
            iv: iv.toString("hex"),
            value: encrypted.toString("hex"),
            scope: this.scopes,
            createdAt: createdAt,
            updatedAt: createdAt,
            expiresAt: this.getExpirationDate(createdAt)
        });
        return await this.tokenBroker.save(token);
    }

    private mapToJSON(map : Map<string, string>) {
        const object : { [key: string] : string } = {};
        map.forEach((value : string, key : string) => {
            object[key] = value
        })
        return object;
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
        let iv = Buffer.from(token.iv, 'hex');
        let encryptedText = Buffer.from(token.value, 'hex');
        let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(process.env.ENCRYPT_TOKEN_KEY, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        const parameters = JSON.parse(decrypted.toString());
        return this.objectToMap(parameters);
    }

    private objectToMap(object : any) {
        const map = new Map<string, string>();
        for (let key of Object.keys(object)) {
            map.set(key, object[key])
        }
        return map;
    }
}