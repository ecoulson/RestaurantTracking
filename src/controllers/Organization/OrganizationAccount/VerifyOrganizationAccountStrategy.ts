import IVerifyUserStrategy from "../../../services/User/Registration/IVerifyUserStrategy";
import UserBroker from "../../../brokers/UserBroker";
import IEmailService from "../../../services/Email/IEmailService";
import RegisterOrganizationAccountEmailStrategy from "../../../services/Organization/OrganizationAccount/RegisterOrganizationAccountEmailStrategy";
import EmailMessageBuilder from "../../../services/Email/EmailMessageBuilder";
import bcrypt from "bcrypt";

export default class VerifyOrganizationAccountStrategy implements IVerifyUserStrategy {
    private userBroker : UserBroker;
    private emailService : IEmailService;
    private email: string;

    constructor(userBroker : UserBroker, emailService: IEmailService, email: string) {
        this.userBroker = userBroker;
        this.email = email;
        this.emailService = emailService;
    }

    async verify() {
        const user = await this.userBroker.findUserByEmail(this.email);
        if (user.verified) {
            throw new Error(`User ${user.id} is already verified`);
        }
        const PIN = this.generatePIN();
        user.password = await bcrypt.hash(PIN, 10);
        this.emailService.sendEmail(new RegisterOrganizationAccountEmailStrategy(
            new EmailMessageBuilder(), 
            user, 
            PIN
        ));
        return await user.save();
    }

    private generatePIN() {
        let PIN = "";
        for (let i = 0; i < 4; i++) {
            PIN += Math.floor(Math.random() * Math.floor(10));
        }
        return PIN;
    }
}