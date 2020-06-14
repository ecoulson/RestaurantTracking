import IUser from "../../models/user/IUser";

export default interface IAuthenticationService {
    login(username: string, password: string) : Promise<IUser>;
    generateAccessToken(user : IUser, rememberMe: boolean) : string;
}