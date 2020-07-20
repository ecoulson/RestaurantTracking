import EmailData from "../../Email/EmailData";
import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import IEmailMessage from "../../Email/IEmailMessage";

export default interface IPasswordRecoveryService {
    sendForgotPasswordEmail(email : string, values : Map<string, string>) : Promise<EmailData>;
    buildEmailMessage(user : IUser, token : IToken) : Promise<IEmailMessage>
}