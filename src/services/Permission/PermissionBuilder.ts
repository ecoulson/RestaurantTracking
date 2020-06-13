import PermissionModel from "../../models/Permission/PermissionModel";
import ResourceType from "../../lib/Authorization/ResourceType";
import OperationType from "../../lib/Authorization/OperationType";
import IPermissionBuilder from "./IPermissionBuilder";

export default class PermissionBuilder implements IPermissionBuilder {
    private resourceId: string;
    private restricted: boolean;
    private operations: OperationType[];
    private resourceType: ResourceType;

    constructor() {
        this.resourceId = "";
        this.restricted = false;
        this.operations = [];
        this.resourceType = ResourceType.Unknown;
    }

    setResourceType(resourceType : ResourceType) {
        this.resourceType = resourceType;
        return this as unknown as IPermissionBuilder;
    }

    setOperations(operations : OperationType[]) {
        this.operations = operations;
        return this as unknown as IPermissionBuilder;
    }

    setRestricted() {
        this.restricted = true;
        return this as unknown as IPermissionBuilder;
    }

    setUnrestricted() {
        this.restricted = false;
        return this as unknown as IPermissionBuilder;
    }

    setResourceId(id: string) {
        this.resourceId = id;
        return this as unknown as IPermissionBuilder;

    }

    build() {
        const permission = new PermissionModel({
            resourceId: this.resourceId,
            resourceType: this.resourceType,
            operations: this.operations,
            restricted: this.restricted
        });
        this.reset();
        return permission;
    }

    private reset() {
        this.resourceId = "";
        this.restricted = false;
        this.operations = [];
        this.resourceType = ResourceType.Unknown
    }
}