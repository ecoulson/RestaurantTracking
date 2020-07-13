import IUser from "../../models/user/IUser";
import ILoginArguments from "./ILoginArguments";

export default interface IAuthenticationService {
    login(parameters : ILoginArguments) : Promise<IUser>;
    generateAccessToken(user : IUser, rememberMe: boolean) : string;
}