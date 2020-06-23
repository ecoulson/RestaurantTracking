import IPermission from "../../models/Permission/IPermission";
import ResourceType from "../../lib/Authorization/ResourceType";
import OperationType from "../../lib/Authorization/OperationType";

export default interface IPermissionBuilder {
    setOperations(operations : OperationType[]) : IPermissionBuilder;
    setResourceType(type : ResourceType) : IPermissionBuilder;
    setResourceId(id: string) : IPermissionBuilder;
    setRestricted() : IPermissionBuilder;
    setUnrestricted() : IPermissionBuilder;
    build() : IPermission;
}