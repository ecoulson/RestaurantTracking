import IEmail from "../lib/Email/IEmail";

export default class EmailBroker {
    async send(email : IEmail) {
        try {
            return await email.send()
        } catch(error) {
            throw error;
        }
    }
}