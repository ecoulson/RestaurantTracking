import ModelMethods from "../ModelMethods";
import IUser from "./IUser";
import IPermissionSet from "../PermissionSet/IPermissionSet";

export default class UserMethods {
    public static serialize() {
        const context = ModelMethods.getContext<IUser>(this);
        return {
            _id: context._id,
            username: context.username,
            password: context.password,
            firstName: context.firstName,
            lastName: context.lastName,
            verified: context.verified,
            schemaVersion: context.schemaVersion
        }
    }

    public static async addPermissionSet(permissionSet : IPermissionSet) {
        const context = ModelMethods.getContext<IUser>(this);
        context.permissionSets.push(permissionSet._id);
        await context.save();
    }
}