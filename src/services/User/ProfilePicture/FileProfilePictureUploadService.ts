import IProfilePictureUploadService from "./IProfilePictureUploadService";
import IUser from "../../../models/User/IUser";
import AWS from "aws-sdk";
import { basename } from "path";
import UserBroker from "../../../brokers/UserBroker";

export default class FileProfilePictureUploadService implements IProfilePictureUploadService<Express.Multer.File> {
    private bucket : AWS.S3;
    private userBroker : UserBroker;

    constructor(userBroker : UserBroker) {
        this.bucket = new AWS.S3();
        this.userBroker = userBroker
    }

    async upload(user : IUser, file : Express.Multer.File) {
        if (!file.mimetype.includes("image")) {
            throw new Error("Your profile picture must be an image")
        }
        const awsURL = await this.uploadToAWS(user, file);
        const profilePicturePath  = `profile_pictures/${basename(awsURL)}`;
        user.profilePicture = profilePicturePath;
        await this.userBroker.save(user);
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