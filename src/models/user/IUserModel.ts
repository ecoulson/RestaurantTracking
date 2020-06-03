import { Model } from "mongoose";
import IUser from "./IUser"

export default interface IUserModel extends Model<IUser> {
    findByUsername(username : string) : IUser
}