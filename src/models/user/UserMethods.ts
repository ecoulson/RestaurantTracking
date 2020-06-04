import ModelMethods from "../ModelMethods";
import IUser from "./IUser";

export default class UserMethods {
    public static serialize() {
        const context = ModelMethods.getContext<IUser>(this);
        return {
            _id: context._id,
            username: context.username,
            password: context.password,
            firstName: context.firstName,
            lastName: context.lastName,
            verified: context.verified,
            schemaVersion: context.schemaVersion
        }
    }
}