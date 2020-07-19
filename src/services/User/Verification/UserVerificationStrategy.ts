import IUser from "../../../models/User/IUser";
import IToken from "../../../models/Token/IToken";
import UserBroker from "../../../brokers/UserBroker";
import TokenBroker from "../../../brokers/TokenBroker";
import Scope from "../../Token/Scope";
import IVerificationStrategy from "./IVerificationStrategy";

export default class UserVerificationStrategy implements IVerificationStrategy {
    private userBroker : UserBroker;
    private tokenBroker : TokenBroker;
    private token: string;
    private email: string;

    constructor(userBroker : UserBroker, tokenBroker : TokenBroker, token: string, email: string) {
        this.userBroker = userBroker;
        this.tokenBroker = tokenBroker;
        this.token = token;
        this.email = email
    }

    async verify() {
        const user = await this.findUserToVerify(this.email);
        const verificationToken = await this.getVerificationToken(user);
        this.verifyVerificationToken(this.token, verificationToken);
        const verifiedUser = await this.verifyUser(user);
        await this.tokenBroker.remove(verificationToken);
        return verifiedUser;
    }

    private async findUserToVerify(email : string) {
        const user = await this.userBroker.findUserByEmail(email);
        if (!user) {
            throw new Error(`No user with email ${email}`);
        }
        if (user.verified) {
            throw new Error(`User with email ${email} is already verified`);
        }
        return user;
    }

    private async getVerificationToken(user : IUser) {
        let tokens = await this.tokenBroker.getTokens(user);
        tokens = tokens.filter((token) => {
            return token.scope.includes(Scope.VerifyEmail)
        });
        if (tokens.length === 0) {
            throw new Error(`No verification tokens associated with ${user._id}`);
        }
        return tokens[0];
    }

    private verifyVerificationToken(providedToken : string, token : IToken) {
        if (token.value !== providedToken) {
            throw new Error("Incorrect verification token provided")
        }
    }

    private async verifyUser(user : IUser) {
        user.verified = true;
        return await this.userBroker.save(user);
    }
}
