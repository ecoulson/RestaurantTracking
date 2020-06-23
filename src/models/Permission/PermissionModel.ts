import { model } from "mongoose";
import IPermission from "./IPermission";
import IPermissionModel from "./IPermissionModel";
import PermissionSchema from "./PermissionSchema";

export default model<IPermission, IPermissionModel>("Permission", PermissionSchema);