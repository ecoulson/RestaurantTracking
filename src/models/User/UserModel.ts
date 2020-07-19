import { model } from "mongoose";
import IUser from "./IUser";
import IUserModel from "./IUserModel";
import UserSchema from "./UserSchema";

export default model<IUser, IUserModel>("User", UserSchema);