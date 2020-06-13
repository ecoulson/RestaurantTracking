import IPermissionSetService from "./IPermissionSetService";
import PermissionSetModel from "../../models/PermissionSet/PermissionSetModel";
import IPermissionSet from "../../models/PermissionSet/IPermissionSet";

export default class PermissionSetService implements IPermissionSetService {
    async create(name : string) {
        const permissionSet = new PermissionSetModel({ name });
        return await this.savePermissionSet(permissionSet);
    }

    private async savePermissionSet(permissionSet : IPermissionSet) {
        try {
            return await permissionSet.save();
        } catch (error) {
            throw new Error(`Failed to save permission set ${permissionSet.name}`)
        }
    }
}