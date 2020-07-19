import IRegistrationBody from "../../../controllers/User/Registration/IRegistrationBody";
import IUser from "../../../models/User/IUser";

export default interface IUserRegistrationService {
    register(registrationBody : IRegistrationBody): Promise<IUser>;
}