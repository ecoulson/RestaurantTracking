import PermissionSetModel from "../models/PermissionSet/PermissionSetModel";
import IPermissionSet from "../models/PermissionSet/IPermissionSet";

export default class PermissionSetBroker {
    async findById(id: string) {
        try {
            return PermissionSetModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async save(permissionSet : IPermissionSet) {
        try {
            return permissionSet.save();
        } catch (error) {
            throw error;
        }
    }
}