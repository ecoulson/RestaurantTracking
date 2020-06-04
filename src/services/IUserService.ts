import IRegistrationBody from "../routes/User/IRegistrationBody";
import IUser from "../models/user/IUser";

export default interface IUserService {
    register(registrationBody : IRegistrationBody): Promise<IUser>;
    sendVerificationEmail(user : IUser) : void;
    sendForgotPasswordEmail(email : string) : void;
}