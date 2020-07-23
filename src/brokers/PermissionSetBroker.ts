import PermissionSetModel from "../models/PermissionSet/PermissionSetModel";

export default class PermissionSetBroker {
    async findById(id: string) {
        try {
            return PermissionSetModel.findById(id);
        } catch (error) {
            throw error;
        }
    }
}