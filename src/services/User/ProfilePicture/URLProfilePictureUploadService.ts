import IProfilePictureUploadService from "./IProfilePictureUploadService";
import IUser from "../../../models/User/IUser";
import path from "path"
import Axios, { AxiosResponse } from "axios";
import FileSystemBroker from "../../../brokers/FileSystemBroker";
import IStorageBroker from "../../../brokers/StorageBroker.ts/IStorageBroker";
import IAWSStorageItem from "../../../brokers/StorageBroker.ts/IAWSStorageItemt";
import StorageItemType from "../../../brokers/StorageBroker.ts/StorageItemType";
import UserBroker from "../../../brokers/UserBroker";

const AcceptedProfilePictureTypes : string[] = ["png", "jpg", "jpeg"];

export default class URLProfilePictureUploadService implements IProfilePictureUploadService<string> {
    private fileBroker : FileSystemBroker;
    private storageBroker : IStorageBroker
    private userBroker : UserBroker;

    constructor(fileBroker : FileSystemBroker, storageBroker : IStorageBroker, userBroker : UserBroker) {
        this.fileBroker = fileBroker;
        this.userBroker = userBroker;
        this.storageBroker = storageBroker;
    }

    async upload(user : IUser, url : string) {
        const awsPath = await this.downloadImageAndUploadToAWS(user, url)
        user.profilePicture = awsPath;
        await this.userBroker.save(user);
    }

    private async downloadImageAndUploadToAWS(user : IUser, url : string) : Promise<string> {
        const filePath = await this.downloadImageToTempFolder(user, url)
        const awsPath = await this.uploadImageToAWS(filePath);
        await this.fileBroker.deleteFile(filePath);
        return `profile_pictures/${path.basename(awsPath)}`;
    }

    private async downloadImageToTempFolder(user : IUser, url: string) : Promise<string> {
        const directoryPath = path.resolve(__dirname, "tmp")
        if (!(await this.fileBroker.directoryExists(directoryPath))) {
            await this.fileBroker.makeDirectory(directoryPath)
        }

        const response = await this.getResponseStream(url);
        this.validateResponse(response);
        const fileType = response.headers["content-type"].split("/")[1];
        const filePath = path.join(directoryPath, `${user.id}.${fileType}`);
        const writeStream = this.fileBroker.createWriteStream(filePath);
        response.data.pipe(writeStream);

        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                resolve(filePath)
            });
            writeStream.on('error', error => reject(error));
        })
    }

    private async getResponseStream(url: string) {
        try {
            return await Axios.get(url, {
                responseType: "stream"
            });
        } catch (error) {
            throw new Error(`Failed to download image from ${url}`)
        }
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
            const readStream = this.fileBroker.createReadStream(filePath);
            readStream.on("error", error => reject(error));
            this.storageBroker
                .upload({
                    Key: `profile_pictures/${path.basename(filePath)}`,
                    Bucket: process.env.BUCKET_NAME,
                    Body: readStream,
                    type: StorageItemType.AWS_S3_Bucket
                } as IAWSStorageItem)
                .then(resolve)
        })
    }
}