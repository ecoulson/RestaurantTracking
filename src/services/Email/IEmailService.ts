import IEmailData from "./IEmailData";
import IBuildEmailStrategy from "./IBuildEmailStrategy";

export default interface IVerificationEmailService {
    sendEmail(buildEmailStrategy: IBuildEmailStrategy): Promise<IEmailData>
}