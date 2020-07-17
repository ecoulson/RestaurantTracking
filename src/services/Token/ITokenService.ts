import IUser from "../../models/User/IUser";
import IToken from "../../models/Token/IToken";

export default interface ITokenService {
    generate(user : IUser, values : Map<string, string>): Promise<IToken>;
    deleteExistingToken(user : IUser): Promise<IToken | null>;
    decryptToken(token: IToken) : Promise<Map<string, string>>
}