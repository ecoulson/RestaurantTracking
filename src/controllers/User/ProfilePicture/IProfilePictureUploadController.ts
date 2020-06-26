import { RequestHandler } from "express";

export default interface IProfilePictureUploadController {
    handleUpload() : RequestHandler;
}