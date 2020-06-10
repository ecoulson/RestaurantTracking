import IUser from "../../models/user/IUser";
import IToken from "../../models/token/IToken";

export default interface ITokenSerivce {
    generate(user : IUser): Promise<IToken>;
    deleteExisitingToken(user : IUser): Promise<IToken | null>;
}