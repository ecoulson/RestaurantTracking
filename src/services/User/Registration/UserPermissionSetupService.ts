import IUserPermissionSetupService from "./IUserPermissionSetupService";
import IUser from "../../../models/User/IUser";
import IPermissionSetService from "../../Permission/IPermissionSetService";
import IPermissionBuilder from "../../Permission/IPermissionBuilder";
import PermissionBuilder from "../../Permission/PermissionBuilder";
import OperationType from "../../../lib/Authorization/OperationType";
import ResourceType from "../../../lib/Authorization/ResourceType";
import UserBroker from "../../../brokers/UserBroker";

export default class UserPermissionSetupService implements IUserPermissionSetupService {
    private permissionSetService : IPermissionSetService;
    private permissionBuilder : IPermissionBuilder;
    private userBroker : UserBroker;

    constructor(permissionSetService : IPermissionSetService, userBroker : UserBroker) {
        this.permissionSetService = permissionSetService;
        this.permissionBuilder = new PermissionBuilder();
        this.userBroker = userBroker;
    }

    async setup(user : IUser) {
        const userPermissionSet = await this.permissionSetService.create(`User:${user._id}`);
        await user.addPermissionSet(userPermissionSet);
        const userPermission = await this.createSelfAccessPermission(user);
        await userPermissionSet.addPermission(userPermission);
        return await this.userBroker.save(user);
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
}