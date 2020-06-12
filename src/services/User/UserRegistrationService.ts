import IUserRegistrationService from "./IUserRegistrationService";
import IRegistrationBody from "../../controllers/User/IRegistrationBody";
import UserModel from "../../models/user/UserModel";
import bcrypt from "bcrypt";
import IUser from "../../models/user/IUser";
import IPermissionSetService from "../Permission/IPermissionSetService";
import PermissionSetService from "../Permission/PermissionSetService";
import IPermissionBuilder from "../Permission/IPermissionBuilder";
import PermissionBuilder from "../Permission/PermissionBuilder";

export default class UserRegistrationService implements IUserRegistrationService {
    private permissionSetService : IPermissionSetService;
    private permissionBuilder : IPermissionBuilder;

    constructor() {
        this.permissionSetService = new PermissionSetService();
        this.permissionBuilder = new PermissionBuilder();
    }

    async register(registration : IRegistrationBody) {
        const user = new UserModel(await this.getUserDocument(registration));
        await this.checkIfUsernameIsTaken(user);
        await this.checkIfEmailIsTaken(user);
        const permissionSet = await this.permissionSetService.create(`User:${user._id}`);
        await user.addPermissionSet(permissionSet);
        const permission = this.permissionBuilder.build();
        await permission.save();
        permissionSet.addPermission(this.permissionBuilder.build())
        return await this.saveUser(user);
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
        if (await this.isUsernameTaken(user.username)) {
            throw new Error(`Username ${user.username} already exists`);
        }
    }

    private async isUsernameTaken(username : string) {
        try {
            return await UserModel.findByUsername(username) !== null;
        } catch (error) {
            throw new Error(`Failed to check if username ${username} already exists`)
        }
    }

    private async checkIfEmailIsTaken(user : IUser) {
        if (await this.isEmailTaken(user.email)) {
            throw new Error(`Email ${user.email} is associated with another account`)
        }
    }

    private async isEmailTaken(email : string) {
        try {
            return await UserModel.findByEmail(email) !== null;
        } catch (error) {
            throw new Error(`Failed to check if email ${email} already exists`)
        }
    }

    private async saveUser(user : IUser) {
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new Error(`Failed to save user with username ${user.username} to the database`);
        }
    }
}