import PermissionModel from "../../models/Permission/PermissionModel";
import ResourceType from "../../lib/Authorization/ResourceType";
import OperationType from "../../lib/Authorization/OperationType";
import IPermissionBuilder from "./IPermissionBuilder";

export default class PermissionBuilder implements IPermissionBuilder {
    private resourceId: string;

    constructor() {
        this.resourceId = "";
    }

    setResourceId(id: string): IPermissionBuilder {
        this.resourceId = id;
        return this;
    }

    build() {
        const permission = new PermissionModel({
            resourceId: this.resourceId,
            resourceType: ResourceType.User,
            operations: [OperationType.Any],
            restricted: true
        });
        this.reset();
        return permission;
    }

    private reset() {
        this.resourceId = "";
    }
}