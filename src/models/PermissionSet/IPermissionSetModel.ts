import { Model } from "mongoose";
import IPermissionSet from "./IPermissionSet";

export default interface IPermissionSetModel extends Model<IPermissionSet> {
    findPermissionSetByName(name: string) : Promise<IPermissionSet>
}