import IUser from "../../../models/user/IUser";

export default interface IVerifyUserService {
    verify(email : string, values: Map<string, string>) : Promise<IUser>
}