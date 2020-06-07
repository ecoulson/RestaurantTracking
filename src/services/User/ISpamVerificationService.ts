import IEmailData from "../../lib/Email/IEmailData";

export default interface ISpamVerificationService {
    cancelAccount(email: string, token: string): Promise<IEmailData>;
}