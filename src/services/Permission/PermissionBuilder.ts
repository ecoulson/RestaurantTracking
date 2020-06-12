import PermissionModel from "../../models/Permission/PermissionModel";
import ResourceType from "../../lib/Authorization/ResourceType";
import OperationType from "../../lib/Authorization/OperationType";

export default class PermissionBuilder {
    build() {
        return new PermissionModel({
            resourceId: "",
            resourceType: ResourceType.User,
            operations: [OperationType.Any],
            restricted: true
        })
    }
}