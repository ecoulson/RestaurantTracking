import IRegistrationBody from "../../controllers/User/IRegistrationBody";
import IUser from "../../models/user/IUser";

export default interface IUserService {
    register(registrationBody : IRegistrationBody): Promise<IUser>;
    sendVerificationEmail(email : string) : void;
    sendForgotPasswordEmail(email : string) : void;
}