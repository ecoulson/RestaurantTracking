import IUser from "../../models/user/IUser";
import IUpdatedProfile from "../../controllers/User/IUpdatedProfile";

export default interface IUserService {
    updateUserProfile(user : IUser, updatedProfile : IUpdatedProfile) : Promise<void>;
}