import IUserService from "./IUserService";
import IUser from "../../models/user/IUser";
import IUpdatedProfile from "../../controllers/User/IUpdatedProfile";

export default class UserService implements IUserService {
    async updateUserProfile(user : IUser, updatedProfile : IUpdatedProfile) {
        user.email = updatedProfile.email;
        user.username = updatedProfile.username;
        user.firstName = updatedProfile.firstName;
        user.lastName = updatedProfile.lastName;
        await user.save();
    }
}