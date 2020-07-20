import IBuildEmailStrategy from "../../Email/IBuildEmailStrategy";
import IEmailMessageBuilder from "../../Email/IEmailMessageBuilder";
import IUser from "../../../models/User/IUser";

export default class RegisterOrganizationAccountEmailStrategy implements IBuildEmailStrategy {
    private emailBuilder : IEmailMessageBuilder;
    private user : IUser;
    private PIN: string;

    constructor(emailBuilder : IEmailMessageBuilder, user : IUser, PIN: string) {
        this.emailBuilder = emailBuilder;
        this.user = user;
        this.PIN = PIN
    }

    async build() {
        return this.emailBuilder
            .setFrom("support@adaptsolutions.tech")
            .setTo(this.user.email)
            .setTemplateId("d-b3a11d69cfcc4b30940ac5f28e181770")
            .setData({
                PIN: this.PIN
            })
            .build();
    }
}