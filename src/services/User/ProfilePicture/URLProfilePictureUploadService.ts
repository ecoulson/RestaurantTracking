import IProfilePictureUploadService from "./IProfilePictureUploadService";
import IUser from "../../../models/user/IUser";
import path from "path"
import { createWriteStream, access, mkdir, createReadStream, unlink } from "fs";
import Axios, { AxiosResponse } from "axios";
import AWS from "aws-sdk";

const AcceptedProfilePictureTypes : string[] = ["png", "jpg", "jpeg"];
const AWSRegion = "us-west-2";
const S3ApiVersion = "2006-03-01";

export default class URLProfilePictureUploadService implements IProfilePictureUploadService<string> {
    private bucket : AWS.S3;

    constructor() {
        AWS.config.region = AWSRegion;
        this.bucket = new AWS.S3({
            apiVersion: S3ApiVersion
        });
    }

    async upload(user : IUser, url : string) {
        const awsPath = await this.downloadImageAndUploadToAWS(user, url)
        user.profilePicture = awsPath;
        await user.save();
    }

    private async downloadImageAndUploadToAWS(user : IUser, url : string) : Promise<string> {
        const filePath = await this.downloadImageToTempFolder(user, url)
        const awsPath = await this.uploadImageToAWS(filePath);
        await this.deleteFile(filePath);
        return `profile_pictures/${path.basename(awsPath)}`;
    }

    private async downloadImageToTempFolder(user : IUser, url: string) : Promise<string> {
        const directoryPath = path.resolve(__dirname, "tmp")
        if (!(await this.doesTempFolderExist(directoryPath))) {
            await this.createTempFolder(directoryPath)
        }

        const response = await Axios.get(url, {
            responseType: "stream"
        });
        this.validateResponse(response);
        const fileType = response.headers["content-type"].split("/")[1];
        const filePath = path.join(directoryPath, `${user.id}.${fileType}`);
        const writeStream = createWriteStream(filePath);
        response.data.pipe(writeStream);

        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                resolve(filePath)
            });
            writeStream.on('error', reject);
        })
    }

    private doesTempFolderExist(directoryPath : string) : Promise<boolean> {
        return new Promise((resolve) => {
            access(directoryPath, (err) => {
                if (!err) {
                    resolve(true);
                }
                resolve(err && err.code === 'ENONT');
            })
        })
    }

    private createTempFolder(directoryPath : string) : Promise<void> {
        return new Promise((resolve, reject) => {
            mkdir(directoryPath, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            })
        })
    }

    private validateResponse(response : AxiosResponse) {
        if (!response.headers["content-type"].includes("image/")) {
            throw new Error("Not an image");
        }
        const fileType = response.headers["content-type"].split("/")[1];
        if (!AcceptedProfilePictureTypes.includes(fileType)) {
            throw new Error("Not an accepted file type")
        }
    }

    private async uploadImageToAWS(filePath : string) : Promise<string> {
        return new Promise((resolve, reject) => {
            const readStream = createReadStream(filePath);
            readStream.on("error", reject);
            this.bucket.upload({
                Key: `profile_pictures/${path.basename(filePath)}`,
                Bucket: process.env.BUCKET_NAME,
                Body: readStream
            }, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data.Location);
            })
        })
    }
    
    private async deleteFile(filePath : string) {
        return new Promise((resolve , reject) => {
            unlink(filePath, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            })
        })
    }
}