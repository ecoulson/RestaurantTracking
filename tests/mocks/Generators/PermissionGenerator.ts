import IGenerator from "./IGenerator";
import IPermission from "../../../src/models/Permission/IPermission";
import PermissionModel from "../../../src/models/Permission/PermissionModel";
import { generateObjectId } from "../../helpers/mongo";
import ResourceType from "../../../src/lib/Authorization/ResourceType";

export default class PermissionGenerator implements IGenerator<IPermission> {
    generate() {
        return new PermissionModel({
            resourceId: generateObjectId(),
            resourceType: ResourceType.Unknown,
            operations: [],
            restricted: false
        })
    }
}