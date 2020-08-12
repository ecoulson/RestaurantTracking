import IVerifyUserStrategy from "../../../services/User/Registration/IVerifyUserStrategy";
import IEmailService from "../../../services/Email/IEmailService";
import RegisterOrganizationAccountEmailStrategy from "../../../services/Organization/OrganizationAccount/RegisterOrganizationAccountEmailStrategy";
import IUser from "../../../models/User/IUser";
import ITokenService from "../../../services/Token/ITokenService";

export default class VerifyOrganizationAccountStrategy implements IVerifyUserStrategy {
    private emailService : IEmailService;
    private tokenService : ITokenService;
    private user: IUser;

    constructor(emailService: IEmailService, tokenService : ITokenService, user: IUser) {
        this.emailService = emailService;
        this.tokenService = tokenService;
        this.user = user;
    }

    async verify() {
        if (this.user.verified) {
            throw new Error(`User ${this.user.id} is already verified`);
        }
        const PIN = this.generatePIN();
        this.tokenService.deleteExistingToken(this.user);
        this.tokenService.generate(this.user, new Map([
            ["code", PIN]
        ]))
        this.emailService.sendEmail(new RegisterOrganizationAccountEmailStrategy(
            this.user, 
            PIN
        ));
        return await this.user.save();
    }

    private generatePIN() {
        let PIN = "";
        for (let i = 0; i < 4; i++) {
            PIN += Math.floor(Math.random() * Math.floor(10));
        }
        return PIN;
    }
}