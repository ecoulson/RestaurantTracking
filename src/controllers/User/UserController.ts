import IUserController from "./IUserController";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IUserService from "../../services/User/IUserService";
import IUpdatedProfile from "./IUpdatedProfile";

export default class UserController implements IUserController {
    private userService : IUserService;

    constructor(userService : IUserService) {
        this.userService = userService;
    }

    handleGetSessionUser() {
        return async (request : Request, response : Response) => {
            return new JSONResponse(response).send(request.user);
        }
    }

    handleUpdateSessionUserProfile() {
        return async (request : Request, response : Response) => {
            const updatedProfile = request.body as IUpdatedProfile;
            await this.userService.updateUserProfile(request.user, updatedProfile);
            return new JSONResponse(response).send(request.user);
        }
    }
}