import IUser from "../../../models/user/IUser";

export default interface IUserVerificationService {
    verify(token: string, email : string) : Promise<IUser>
}