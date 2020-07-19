import IUser from "../../../models/User/IUser";

export default interface IUserPermissionSetupService {
    setup(user : IUser) : Promise<IUser>
}