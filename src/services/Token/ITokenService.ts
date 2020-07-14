import IUser from "../../models/user/IUser";
import IToken from "../../models/token/IToken";

export default interface ITokenService {
    generate(user : IUser, values : Map<string, string>): Promise<IToken>;
    deleteExistingToken(user : IUser): Promise<IToken | null>;
    decryptToken(token: IToken) : Promise<Map<string, string>>
}