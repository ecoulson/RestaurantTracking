import IUserRegistrationService from "./IUserRegistrationService";
import IRegistrationBody from "../../../controllers/User/Registration/IRegistrationBody";
import UserModel from "../../../models/user/UserModel";
import bcrypt from "bcrypt";
import IUser from "../../../models/user/IUser";
import UserBroker from "../../../brokers/UserBroker";

export default class UserRegistrationService implements IUserRegistrationService {
    private userBroker : UserBroker;

    constructor() {
        this.userBroker = new UserBroker();
    }

    async register(registration : IRegistrationBody) {
        const user = new UserModel(await this.getUserDocument(registration));
        await this.checkIfUsernameIsTaken(user);
        await this.checkIfEmailIsTaken(user);
        return await this.userBroker.save(user);
    }

    private async getUserDocument(registration : IRegistrationBody) {
        try {
            return {
                firstName: registration.firstName,
                lastName: registration.lastName,
                email: registration.email,
                username: registration.username,
                password: await bcrypt.hash(registration.password, 10)
            };
        } catch (error) {
            throw new Error(`Failed to hash password for registering user ${registration.username}`)
        }
    }

    private async checkIfUsernameIsTaken(user : IUser) {
        if (await this.userBroker.findUserByUsername(user.username)) {
            throw new Error(`Username ${user.username} already exists`);
        }
    }

    private async checkIfEmailIsTaken(user : IUser) {
        if (await this.userBroker.findUserByEmail(user.email)) {
            throw new Error(`Email ${user.email} is associated with another account`)
        }
    }
}