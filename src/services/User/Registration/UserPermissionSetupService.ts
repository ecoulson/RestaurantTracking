import IUserPermissionSetupService from "./IUserPermissionSetupService";
import IUser from "../../../models/user/IUser";
import IPermissionSetService from "../../Permission/IPermissionSetService";
import PermissionSetService from "../../Permission/PermissionSetService";
import IPermissionBuilder from "../../Permission/IPermissionBuilder";
import PermissionBuilder from "../../Permission/PermissionBuilder";
import OperationType from "../../../lib/Authorization/OperationType";
import ResourceType from "../../../lib/Authorization/ResourceType";

export default class UserPermissionSetupService implements IUserPermissionSetupService {
    private permissionSetService : IPermissionSetService;
    private permissionBuilder : IPermissionBuilder;

    constructor() {
        this.permissionSetService = new PermissionSetService();
        this.permissionBuilder = new PermissionBuilder();
    }

    async setup(user : IUser) {
        const userPermissionSet = await this.permissionSetService.create(`User:${user._id}`);
        await user.addPermissionSet(userPermissionSet);
        const userPermission = await this.createSelfAccessPermission(user);
        await userPermissionSet.addPermission(userPermission);
        return await this.saveUser(user);
    }

    private async createSelfAccessPermission(user : IUser) {
        const userPermission = this.permissionBuilder
                                .setResourceId(user._id)
                                .setOperations([OperationType.Any])
                                .setResourceType(ResourceType.User)
                                .setRestricted()
                                .build();
        await userPermission.save();
        return userPermission;
    }

    private async saveUser(user : IUser) {
        try {
            return await user.save();
        } catch (error) {
            throw new Error(`Failed to save user ${user.id}`)
        }
    }
}