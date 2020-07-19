import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import IEmailData from "../../../lib/Email/IEmailData";

export default interface IVerificationEmailService {
    sendVerificationEmail(user : IUser, token : IToken): Promise<IEmailData>
}