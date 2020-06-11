import IUser from "../../models/user/IUser";

export default interface IPasswordResetService {
    reset(email: string, newPassword : string, token : string) : Promise<IUser>
}