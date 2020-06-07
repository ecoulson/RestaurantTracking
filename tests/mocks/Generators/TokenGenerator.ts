import IGenerator from "./IGenerator";
import IToken from "../../../src/models/token/IToken";
import TokenModel from "../../../src/models/token/TokenModel";
import Scope from "../../../src/services/Token/Scope";
import { generateObjectId } from "../../helpers/mongo";

export default class TokenGenerator implements IGenerator<IToken> {
    private value : string | null;
    private dateCreated : Date | null;
    private expiresAt : Date | null;
    private userId : string | null;
    private scope : Scope[] | null;

    generate() {
        const token = new TokenModel({
            value: this.value,
            createdAt: this.dateCreated ? this.dateCreated : new Date(),
            expiresAt: this.expiresAt ? this.expiresAt : new Date(),
            userId: this.userId ? this.userId : generateObjectId(),
            updatedAt: this.dateCreated ? this.dateCreated : new Date(),
            scope: this.scope ? this.scope : []
        });
        this.reset();
        return token; 
    }

    private reset() {
        this.value = null;
        this.dateCreated = null;
        this.expiresAt = null;
        this.userId = null;
        this.scope = null;
    }

    setValue(value : string) {
        this.value = value;
    }

    setDateCreated(date : Date) {
        this.dateCreated = date;
        const expirationDate = new Date(date.valueOf());
        expirationDate.setDate(date.getDate() + 1);
        this.expiresAt = expirationDate;
    }

    setExpiresAt(date : Date) {
        this.expiresAt = date;
    }

    setUserId(userId : string) {
        this.userId = userId;
    }

    setScope(scope : Scope[]) {
        this.scope = scope;
    }
}