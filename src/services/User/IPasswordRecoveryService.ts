export default interface IPasswordRecoveryService {
    sendForgotPasswordEmail(email : string) : Promise<void>;
}