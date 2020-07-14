import IUser from "../../../models/user/IUser";

export default interface IVerifyUserService {
    verify(email : string) : Promise<IUser>
}