import ModelStatics from "../ModelStatics";
import IPermissionSetModel from "./IPermissionSetModel";

export default class PermissionSetStatics {
    public static async findPermissionSetByName(name: string) {
        const context = ModelStatics.getContext<IPermissionSetModel>(this);
        return await context.findOne({ name })
    }
}