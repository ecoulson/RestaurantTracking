import IUser from "../IUser";

export default interface IRegisterAnonymousOrganizationUserResponse {
    user: IUser;
    token: string;
}