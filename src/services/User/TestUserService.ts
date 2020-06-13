import UserModel from "../../models/user/UserModel";

export default class TestUserService {
    async getUser(userId : string) {
        return await UserModel.findById(userId);
    }
}