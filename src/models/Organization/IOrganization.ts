import IOrganizationSchema from "./IOrganizationSchema";
import IUser from "../User/IUser";
import IPermissionSet from "../PermissionSet/IPermissionSet";

export default interface IOrganization extends IOrganizationSchema {
    addStudent(user : IUser) : Promise<void>;
    addPermissionSet(permissionSet : IPermissionSet) : Promise<void>;
    getPermissionSets(): Promise<IPermissionSet[]>;
    permissionSets: string[]
}