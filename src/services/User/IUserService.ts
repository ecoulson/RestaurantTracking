import IUser from "../../models/User/IUser";
import IUpdatedProfile from "../../controllers/User/IUpdatedProfile";

export default interface IUserService {
    updateUserProfile(user : IUser, updatedProfile : IUpdatedProfile) : Promise<void>;
}