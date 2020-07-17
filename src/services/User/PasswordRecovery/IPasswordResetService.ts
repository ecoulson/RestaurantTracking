import IUser from "../../../models/User/IUser";

export default interface IPasswordResetService {
    reset(email: string, newPassword : string, token : string) : Promise<IUser>
}