import IUser from "../../models/user/IUser";

export default interface IUserPermissionSetupService {
    setup(user : IUser) : Promise<IUser>
}