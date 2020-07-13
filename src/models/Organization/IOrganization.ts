import IOrganizationSchema from "./IOrganizationSchema";
import IUser from "../user/IUser";
import IPermissionSetSchema from "../PermissionSet/IPermissionSetSchema";
import IPermissionSet from "../PermissionSet/IPermissionSet";

export default interface IOrganization extends IOrganizationSchema {
    addStudent(user : IUser) : Promise<void>;
    addPermissionSet(permissionSet : IPermissionSet) : Promise<void>;
    getPermissionSets(): Promise<IPermissionSet[]>;
    permissionSets: Array<IPermissionSetSchema["_id"]>
}