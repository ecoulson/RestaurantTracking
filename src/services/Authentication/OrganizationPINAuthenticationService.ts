import IAuthenticationService from "./IAuthenticationService";
import jsonwebtoken from "jsonwebtoken";
import IUser from "../../models/User/IUser";
import UserBroker from "../../brokers/UserBroker";
import bcrypt from "bcrypt";
import OrganizationPINLoginArguments from "./OrganizationPinLoginArguments";
import IOrganizationAccountExistsService from "../Organization/OrganizationAccount/IOrganizationAccountExistsService";
import OrganizationAccountExistsService from "../Organization/OrganizationAccount/OrganizationAccountExistsService";

export default class OrganizationPINAuthenticationService implements IAuthenticationService {
    private userBroker : UserBroker;
    private organizationAccountService : IOrganizationAccountExistsService

    constructor() {
        this.userBroker = new UserBroker();
        this.organizationAccountService = new OrganizationAccountExistsService();
    }

    public async login(parameters : OrganizationPINLoginArguments) {
        const { email, PIN, organizationId } = parameters;
        if (await this.organizationAccountService.hasAccount(organizationId, email)) {
            const user = await this.userBroker.findUserByEmail(email);
            if (!user) {
                throw new Error("No user with email");
            }
            await this.checkPIN(user, PIN);
            return user;
        }
        throw new Error("No user in organization");
    }

    private async checkPIN(user : IUser, password : string) {
        if (!await this.isCorrectPIN(user, password)) {
            throw new Error(`Login for ${user._id} failed because passwords did not match`);
        }
    }

    private async isCorrectPIN(user : IUser, password : string) {
        try {
            return await bcrypt.compare(password, user.password);
        } catch (error) {
            throw new Error(
                `Error ocurred while comparing password for user with id ${user._id}`
            )
        }
    }

    public generateAccessToken(user : IUser) {
        try {
            return jsonwebtoken.sign({
                _id: user._id,
            }, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            throw new Error(`Failed to generate access token for user id ${user._id}`)
        }
    }
}