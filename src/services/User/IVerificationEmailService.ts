import IVerificationEmailData from "../../lib/Email/IVerificationEmailData";

export default interface IVerificationEmailService {
    sendVerificationEmail(email : string): Promise<IVerificationEmailData>
}