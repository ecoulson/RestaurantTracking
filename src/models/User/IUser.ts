import IUserSchema from "./IUserSchema";
import IPermissionSetSchema from "../PermissionSet/IPermissionSetSchema";
import IPermissionSet from "../PermissionSet/IPermissionSet";
import IPermission from "../Permission/IPermission";

export default interface IUser extends IUserSchema {
    serialize() : IUser;
    addPermissionSet(permissionSet : IPermissionSet) : Promise<void>;
    addPermission(permission : IPermission) : Promise<void>;
    permissionSets: Array<IPermissionSetSchema["_id"]>
}