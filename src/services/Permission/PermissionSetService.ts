import IPermissionSetService from "./IPermissionSetService";
import PermissionSetModel from "../../models/PermissionSet/PermissionSetModel";

export default class PermissionSetService implements IPermissionSetService {
    async create(name : string) {
        const permissionSet = new PermissionSetModel({ name });
        return await permissionSet.save();
    }
}