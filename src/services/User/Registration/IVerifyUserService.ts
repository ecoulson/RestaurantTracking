import IUser from "../../../models/User/IUser";

export default interface IVerifyUserService {
    verify(email : string, values: Map<string, string>) : Promise<IUser>
}