import IPermissionSetSchema from "./IPermissionSetSchema";
import IPermission from "../Permission/IPermission";

export default interface IPermissionSet extends IPermissionSetSchema {
    permissions: string[]
    addPermission(permission : IPermission) : Promise<void>
}