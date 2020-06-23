import IDocument from "../IDocument";
import Scope from "../../services/Token/Scope";

export default interface ITokenSchema extends IDocument {
    value: string;
    userId: string;
    refreshToken?: string;
    createdAt: Date;
    expiresAt?: Date;
    updatedAt: Date;
    scope: Scope[];
}