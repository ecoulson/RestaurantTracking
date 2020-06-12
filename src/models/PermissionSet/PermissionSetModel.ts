import { model } from "mongoose";
import IPermissionSet from "./IPermissionSet";
import IPermissionSetModel from "./IPermissionSetModel";
import PermissionSetSchema from "./PermissionSetSchema";

export default model<IPermissionSet, IPermissionSetModel>("PermissionSet", PermissionSetSchema)