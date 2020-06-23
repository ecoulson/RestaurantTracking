import ResourceType from "../../lib/Authorization/ResourceType";
import IDocument from "../IDocument";
import OperationType from "../../lib/Authorization/OperationType";

export default interface IPermissionSchema extends IDocument {
    resourceId: string;
    resourceType: ResourceType;
    operations: OperationType[];
    restricted: boolean;
}