import IUser from "../../models/user/IUser";
import IToken from "../../models/token/IToken";

export default interface ITokenService {
    generate(user : IUser): Promise<IToken>;
    deleteExistingToken(user : IUser): Promise<IToken | null>;
}