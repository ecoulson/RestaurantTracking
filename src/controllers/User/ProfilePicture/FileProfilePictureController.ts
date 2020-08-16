import { Request, Response } from "express";
import IProfilePictureUploadController from "./IProfilePictureUploadController";
import IProfilePictureUploadService from "../../../services/User/ProfilePicture/IProfilePictureUploadService";
import FileProfilePictureUploadService from "../../../services/User/ProfilePicture/FileProfilePictureUploadService";
import UserBroker from "../../../brokers/UserBroker";
import { S3 } from "aws-sdk";
import AWSStorageBroker from "../../../brokers/StorageBroker.ts/AWSStorageBroker";

export default class FileProfilePictureController implements IProfilePictureUploadController {
    private fileProfilePictureService : IProfilePictureUploadService<Express.Multer.File>;

    constructor() {
        this.fileProfilePictureService = new FileProfilePictureUploadService(
            new UserBroker(),
            new AWSStorageBroker(new S3())
        );
    }

    handleUpload() {
        return async (request : Request, response : Response) => {
            this.fileProfilePictureService.upload(request.user, request.file)
            return response.send();
        }
    }
}