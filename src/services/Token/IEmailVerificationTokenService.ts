import ITokenSerivce from "./ITokenService";
import IUser from "../../models/user/IUser";
import IToken from "../../models/token/IToken";

export default interface IEmailVerificationTokenService extends ITokenSerivce {
    deleteExisitingVerificationToken(user : IUser): Promise<IToken | null>
}