import IUser from "../../../models/User/IUser";
import IVerificationStrategy from "./IVerificationStrategy";

export default interface IUserVerificationService {
    verify(verificationStrategy : IVerificationStrategy) : Promise<IUser>
}