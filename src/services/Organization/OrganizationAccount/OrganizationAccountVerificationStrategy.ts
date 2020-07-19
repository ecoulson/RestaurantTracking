import IVerificationStrategy from "../../User/Verification/IVerificationStrategy";
import UserBroker from "../../../brokers/UserBroker";
import bcrypt from "bcrypt";

export default class OrganizationAccountVerificationStrategy implements IVerificationStrategy {
    private email: string;
    private password: string;
    private userBroker : UserBroker;

    constructor(userBroker : UserBroker, email: string, password: string) {
        this.email = email;
        this.password = password;
        this.userBroker = userBroker;
    }

    async verify() {
        const user = await this.userBroker.findUserByEmail(this.email);
        if (await bcrypt.compare(this.password, user.password)) {
            user.verified = true;
            return await user.save();
        } else {
            throw new Error("Failed to verify user, incorrect verification PIN");
        }
    }
}