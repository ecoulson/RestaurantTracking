import IUser from "../../../models/User/IUser";
import IVerifyUserStrategy from "./IVerifyUserStrategy";

export default interface IVerifyUserService {
    verify(verifyUserStrategy: IVerifyUserStrategy) : Promise<IUser>
}