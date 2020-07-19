import IUser from "../../../models/User/IUser";

export default interface IUserVerificationService {
    verify(token: string, email : string) : Promise<IUser>
}