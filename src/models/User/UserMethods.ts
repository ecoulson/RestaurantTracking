import ModelMethods from "../ModelMethods";
import IUser from "./IUser";
import IPermissionSet from "../PermissionSet/IPermissionSet";
import PermissionSetModel from "../PermissionSet/PermissionSetModel";
import IPermission from "../Permission/IPermission";

export default class UserMethods {
    public static serialize() {
        const context = ModelMethods.getContext<IUser>(this);
        return {
            _id: context._id,
            username: context.username,
            firstName: context.firstName,
            lastName: context.lastName,
            verified: context.verified,
            stripeId: context.stripeId,
            organizations: context.organizations,
            dateCreated: context.dateCreated,
            updatedAt: context.updatedAt,
            schemaVersion: context.schemaVersion
        }
    }

    public static async addPermissionSet(permissionSet : IPermissionSet) {
        const context = ModelMethods.getContext<IUser>(this);
        context.permissionSets.push(permissionSet._id);
        await context.save();
    }

    public static async addPermission(permission : IPermission) {
        const context = ModelMethods.getContext<IUser>(this);
        const permissionSet = await PermissionSetModel.findPermissionSetByName(`User:${context._id}`);
        await permissionSet.addPermission(permission);
    }
}