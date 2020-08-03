import PermissionSetModel from "../models/PermissionSet/PermissionSetModel";
import IPermissionSet from "../models/PermissionSet/IPermissionSet";

export default class PermissionSetBroker {
    async findById(id: string) {
        try {
            return await PermissionSetModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async save(permissionSet : IPermissionSet) {
        try {
            return await permissionSet.save();
        } catch (error) {
            throw error;
        }
    }

    async findByName(name: string) {
        try {
            return await PermissionSetModel.findOne({ name });
        } catch (error) {
            throw error;
        }
    }

    async delete(permissionSet : IPermissionSet) {
        try {
            return await permissionSet.remove();
        } catch (error) {
            throw error;
        }
    }
}