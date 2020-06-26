import IProfilePictureService from "./IProfilePictureService";
import UserModel from "../../../models/user/UserModel";
import AWS from "aws-sdk"
import IUser from "../../../models/user/IUser";

export default class ProfilePictureService implements IProfilePictureService {
    private bucket : AWS.S3

    constructor() {
        this.bucket = new AWS.S3();
    }

    async getProfilePicture(userId: string) : Promise<Buffer> {
        const user = await UserModel.findById(userId);
        return await this.getProfileImageBuffer(user);
    }

    private getProfileImageBuffer(user : IUser) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.bucket.getObject({
                Bucket: process.env.BUCKET_NAME,
                Key: user.profilePicture
            }, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data.Body)
            })
        })
    }
}