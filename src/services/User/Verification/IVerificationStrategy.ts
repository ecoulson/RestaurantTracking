import IUser from "../../../models/User/IUser";

export default interface IVerificationStrategy {
    verify() : Promise<IUser>
}