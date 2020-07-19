import IUser from "../../../models/User/IUser";

export default interface IVerifyUserStrategy {
    verify() : Promise<IUser>;
}