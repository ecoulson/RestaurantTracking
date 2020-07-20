import IEmailData from "../../../services/Email/IEmailData";

export default interface ISpamVerificationService {
    cancelAccount(email: string, token: string): Promise<IEmailData>;
}