import PermissionModel from "../models/Permission/PermissionModel";
import IPermission from "../models/Permission/IPermission";

export default class PermissionBroker {
    async findByResourceId(resourceId: string) {
        try {
            return await PermissionModel.find({ resourceId })
        } catch (error) {
            throw error;
        }
    }

    async findOneByResourceId(resourceId: string) {
        try {
            return await PermissionModel.findOne({ resourceId })
        } catch (error) {
            throw error;
        }
    }

    async remove(permission: IPermission) {
        try {
            return await permission.remove();
        } catch (error) {
            throw error;
        }
    }
}