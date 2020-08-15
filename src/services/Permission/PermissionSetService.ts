import IPermissionSetService from "./IPermissionSetService";
import PermissionSetModel from "../../models/PermissionSet/PermissionSetModel";
import PermissionSetBroker from "../../brokers/PermissionSetBroker";

export default class PermissionSetService implements IPermissionSetService {
    private permissionSetBroker : PermissionSetBroker;

    constructor(permissionSetBroker : PermissionSetBroker) {
        this.permissionSetBroker = permissionSetBroker;
    }

    async create(name : string) {
        const permissionSet = new PermissionSetModel({ name });
        return await this.permissionSetBroker.save(permissionSet);
    }
}