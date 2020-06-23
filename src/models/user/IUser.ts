import IUserSchema from "./IUserSchema";
import IPermissionSetSchema from "../PermissionSet/IPermissionSetSchema";
import IPermissionSet from "../PermissionSet/IPermissionSet";

export default interface IUser extends IUserSchema {
    serialize() : IUser;
    addPermissionSet(permissionSet : IPermissionSet) : Promise<void>;
    permissionSets: Array<IPermissionSetSchema["_id"]>
}