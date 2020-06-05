import IRegistrationBody from "../../controllers/User/IRegistrationBody";
import IUser from "../../models/user/IUser";
import IVerificationEmailData from "../../lib/Email/IVerificationEmailData";

export default interface IUserService {
    register(registrationBody : IRegistrationBody): Promise<IUser>;
    sendVerificationEmail(email : string) : Promise<IVerificationEmailData>;
    sendForgotPasswordEmail(email : string) : Promise<void>;
}