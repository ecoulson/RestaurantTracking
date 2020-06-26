import IUser from "../../../models/user/IUser";

export default interface IPasswordUpdateService {
    updatePassword(user : IUser, currentPassword : string, newPassword : string) : Promise<void>;
}