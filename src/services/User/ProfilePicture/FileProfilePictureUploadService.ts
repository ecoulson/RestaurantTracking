import IProfilePictureUploadService from "./IProfilePictureUploadService";
import IUser from "../../../models/User/IUser";
import { basename } from "path";
import UserBroker from "../../../brokers/UserBroker";
import IStorageBroker from "../../../brokers/StorageBroker.ts/IStorageBroker";
import IAWSStorageItem from "../../../brokers/StorageBroker.ts/IAWSStorageItemt";
import StorageItemType from "../../../brokers/StorageBroker.ts/StorageItemType";

export default class FileProfilePictureUploadService implements IProfilePictureUploadService<Express.Multer.File> {
    private userBroker : UserBroker;
    private storageBroker : IStorageBroker

    constructor(userBroker : UserBroker, storageBroker : IStorageBroker) {
        this.userBroker = userBroker
        this.storageBroker = storageBroker;
    }

    async upload(user : IUser, file : Express.Multer.File) {
        if (!file.mimetype.includes("image")) {
            throw new Error("Your profile picture must be an image")
        }
        const imageUrl = await this.uploadToStorage(user, file);
        const profilePicturePath  = `profile_pictures/${basename(imageUrl)}`;
        user.profilePicture = profilePicturePath;
        await this.userBroker.save(user);
    }

    private async uploadToStorage(user : IUser, file: Express.Multer.File) {
        const fileType = file.mimetype.split("/")[1];
        return await this.storageBroker.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: `profile_pictures/${user.id}.${fileType}`,
            Body: file.buffer,
            type: StorageItemType.AWS_S3_Bucket
        } as IAWSStorageItem)
    }
}