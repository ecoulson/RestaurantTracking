import IProfilePictureUploadController from "./IProfilePictureUploadController";
import { Request, Response } from "express";
import URLProfilePictureUploadService from "../../../services/User/ProfilePicture/URLProfilePictureUploadService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import IProfilePictureUploadService from "../../../services/User/ProfilePicture/IProfilePictureUploadService";
import FileSystemBroker from "../../../brokers/FileSystemBroker";
import AWSStorageBroker from "../../../brokers/StorageBroker.ts/AWSStorageBroker";
import { S3 } from "aws-sdk";
import UserBroker from "../../../brokers/UserBroker";

export default class URLProfilePictureUploadController implements IProfilePictureUploadController {
    private profilePictureUploadService : IProfilePictureUploadService<string>;

    constructor() {
        this.profilePictureUploadService = new URLProfilePictureUploadService(
            new FileSystemBroker(),
            new AWSStorageBroker(new S3()),
            new UserBroker()
        );
    }

    handleUpload() {
        return async (req : Request, response : Response) => {
            await this.profilePictureUploadService.upload(req.user, req.body.link)
            return new JSONResponse(response).send(true)
        }
    }
}