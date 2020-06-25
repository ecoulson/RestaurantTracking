import { RequestHandler } from "express";

export default interface IProfilePictureController {
    handleGetProfilePicture() : RequestHandler;
}