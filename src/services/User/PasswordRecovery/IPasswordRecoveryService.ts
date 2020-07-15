import EmailData from "../../../lib/Email/EmailData";
import IEmailMessageBuilder from "../../../lib/Email/IEmailMessageBuilder";
import IUser from "../../../models/user/IUser";
import IToken from "../../../models/token/IToken";

export default interface IPasswordRecoveryService {
    sendForgotPasswordEmail(email : string, values : Map<string, string>) : Promise<EmailData>;
    buildEmailMessage(user : IUser, token : IToken) : Promise<IEmailMessageBuilder>
}