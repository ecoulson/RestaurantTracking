import IUser from "../../../models/user/IUser";

export default interface IProfilePictureUploadService<T> {
    upload(user : IUser, file : T) : Promise<void>;
}