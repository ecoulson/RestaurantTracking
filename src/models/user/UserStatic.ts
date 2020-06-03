import IUserModel from "./IUserModel";
import ModelStatics from "../ModelStatics";

export default class UserStatic {
    public static async findByUsername(username : string) {
        const context : IUserModel = ModelStatics.getContext<IUserModel>(this);
        return await context.findOne({ username });
    }
}