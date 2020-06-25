import IProfilePictureUploadService from "./IProfilePictureUploadService";
import IUser from "../../../models/user/IUser";
import AWS from "aws-sdk";
import { basename } from "path";

export default class FileProfilePictureUploadService implements IProfilePictureUploadService<Express.Multer.File> {
    private bucket : AWS.S3;

    constructor() {
        this.bucket = new AWS.S3();
    }

    async upload(user : IUser, file : Express.Multer.File) : Promise<void>{
        if (!file.mimetype.includes("image")) {
            throw new Error("Not an image")
        }
        const awsURL = await this.uploadToAWS(user, file);
        const profilePicturePath  = `profile_pictures/${basename(awsURL)}`;
        user.profilePicture = profilePicturePath;
        await user.save();
    }

    private uploadToAWS(user : IUser, file : Express.Multer.File) : Promise<string> {
        return new Promise((resolve, reject) => {
            const fileType = file.mimetype.split("/")[1];
            this.bucket.upload({
                Bucket: process.env.BUCKET_NAME,
                Key: `profile_pictures/${user.id}.${fileType}`,
                Body: file.buffer
            }, (err, data) => {
                if (err) {
                    return reject(err);
                }  
                return resolve(data.Location);
            })
        })
    }
}