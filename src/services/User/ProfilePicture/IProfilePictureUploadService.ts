import IUser from "../../../models/User/IUser";

export default interface IProfilePictureUploadService<T> {
    upload(user : IUser, file : T) : Promise<void>;
}