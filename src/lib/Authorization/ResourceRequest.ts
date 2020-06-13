import IResourceRequest from "./IResourceRequest";
import ResourceType from "./ResourceType";

export default class ResourceRequest implements IResourceRequest {
    id : string;
    type : ResourceType;

    constructor(id : string, type : ResourceType) {
        this.id = id;
        this.type = type;
    }
}