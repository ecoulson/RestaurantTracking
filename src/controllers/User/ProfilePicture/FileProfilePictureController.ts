import { Request, Response } from "express";
import IProfilePictureUploadController from "./IProfilePictureUploadController";
import IProfilePictureUploadService from "../../../services/User/ProfilePicture/IProfilePictureUploadService";
import FileProfilePictureUploadService from "../../../services/User/ProfilePicture/FileProfilePictureUploadService";

export default class FileProfilePictureController implements IProfilePictureUploadController {
    private fileProfilePictureService : IProfilePictureUploadService<Express.Multer.File>;

    constructor() {
        this.fileProfilePictureService = new FileProfilePictureUploadService();
    }

    handleUpload() {
        return async (request : Request, response : Response) => {
            this.fileProfilePictureService.upload(request.user, request.file)
            return response.send();
        }
    }
}