import IBuildEmailStrategy from "../../Email/IBuildEmailStrategy";
import IUser from "../../../models/User/IUser";
import EmailMessageBuilder from "../../Email/EmailMessageBuilder";

export default class RegisterOrganizationAccountEmailStrategy implements IBuildEmailStrategy {
    private user : IUser;
    private password: string;

    constructor(user : IUser, password: string) {
        this.user = user;
        this.password = password
    }

    async build() {
        return new EmailMessageBuilder()
            .setFrom("support@adaptsolutions.tech")
            .setTo(this.user.email)
            .setTemplateId("d-b3a11d69cfcc4b30940ac5f28e181770")
            .setData({
                PIN: this.password
            })
            .build();
    }
}