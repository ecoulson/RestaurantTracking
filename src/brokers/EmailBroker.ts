import IEmail from "../lib/Email/IEmail";
import IEmailData from "../lib/Email/IEmailData";

export default class EmailBroker<T extends IEmailData> {
    async send(email : IEmail) {
        try {
            return await email.send() as T
        } catch(error) {
            throw error;
        }
    }
}