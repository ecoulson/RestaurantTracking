import IUser from "../../../models/user/IUser";
import IToken from "../../../models/token/IToken";

export default interface IVerificationEmailService {
    sendVerificationEmail(user : IUser, token : IToken): Promise<IEmailData>
}