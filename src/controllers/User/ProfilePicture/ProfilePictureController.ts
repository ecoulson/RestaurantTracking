import IProfilePictureController from "./IProfilePictureController";
import { Request, Response } from "express";
import IProfilePictureService from "../../../services/User/ProfilePicture/IProfilePictureService";
import ProfilePictureService from "../../../services/User/ProfilePicture/ProfilePictureService";

export default class ProfilePictureController implements IProfilePictureController {
    private profilePictureService : IProfilePictureService;

    constructor() {
        this.profilePictureService = new ProfilePictureService();
    }

    handleGetProfilePicture() {
        return async (request : Request, response : Response) => {
            const buffer = await this.profilePictureService.getProfilePicture(request.params.userId);
            return response.type("jpeg").send(buffer);
        }
    }
}