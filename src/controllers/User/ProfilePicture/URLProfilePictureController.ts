import IProfilePictureUploadController from "./IProfilePictureUploadController";
import { Request, Response } from "express";
import URLProfilePictureUploadService from "../../../services/User/ProfilePicture/URLProfilePictureUploadService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";

export default class URLProfilePictureUploadController implements IProfilePictureUploadController {
    private profilePictureUploadService = new URLProfilePictureUploadService();

    constructor() {
        this.profilePictureUploadService = new URLProfilePictureUploadService();
    }

    handleUpload() {
        return async (req : Request, response : Response) => {
            await this.profilePictureUploadService.upload(req.user, req.body.link)
            return new JSONResponse(response).send(true)
        }
    }
}