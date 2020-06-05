import { Model } from "mongoose";
import IToken from "./IToken";

export default interface ITokenModel extends Model<IToken> {
    findByUserId(id : string) : Promise<IToken[]>;
}