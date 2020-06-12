import IPermission from "../Permission/IPermission";
import ModelMethods from "../ModelMethods";
import IPermissionSet from "./IPermissionSet";

export default class PermissionSetMethods {
    public static async addPermission(permission : IPermission) {
        const context = ModelMethods.getContext<IPermissionSet>(this);
        context.permissions.push(permission._id);
        await context.save();
    }
}