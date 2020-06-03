import IUserSchema from "./IUserSchema";

export default interface IUser extends IUserSchema {
    serialize() : IUser
}