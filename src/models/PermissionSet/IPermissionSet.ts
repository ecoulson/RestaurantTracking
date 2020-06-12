import IPermissionSchema from "../Permission/IPermissionSchema";
import IPermissionSetSchema from "./IPermissionSetSchema";
import IPermission from "../Permission/IPermission";

export default interface IPermissionSet extends IPermissionSetSchema {
    permissions: Array<IPermissionSchema["_id"]>
    addPermission(permission : IPermission) : Promise<void>
}