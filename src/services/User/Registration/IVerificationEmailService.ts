import IUser from "../../../models/user/IUser";
import IToken from "../../../models/token/IToken";
import IEmailData from "../../../lib/Email/IEmailData";

export default interface IVerificationEmailService {
    sendVerificationEmail(user : IUser, token : IToken): Promise<IEmailData>
}