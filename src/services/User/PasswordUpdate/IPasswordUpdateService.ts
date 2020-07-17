import IUser from "../../../models/User/IUser";

export default interface IPasswordUpdateService {
    updatePassword(user : IUser, currentPassword : string, newPassword : string) : Promise<void>;
}