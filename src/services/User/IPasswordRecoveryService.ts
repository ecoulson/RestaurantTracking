import EmailData from "../../lib/Email/EmailData";

export default interface IPasswordRecoveryService {
    sendForgotPasswordEmail(email : string) : Promise<EmailData>;
}