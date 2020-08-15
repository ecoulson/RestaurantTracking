import IPasswordUpdateController from "./IPasswordUpdateController";
import { Request, Response } from "express";
import IPasswordUpdateService from "../../../services/User/PasswordUpdate/IPasswordUpdateService";
import PasswordUpdateService from "../../../services/User/PasswordUpdate/PasswordUpdateService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import UserBroker from "../../../brokers/UserBroker";

export default class PasswordUpdateController implements IPasswordUpdateController {
    private passwordUpdateService : IPasswordUpdateService;

    constructor() {
        this.passwordUpdateService = new PasswordUpdateService(
            new UserBroker()
        );
    }

    handlePasswordUpdate() {
        return async (request : Request, response : Response) => {
            await this.passwordUpdateService.updatePassword(
                request.user,
                request.body.currentPassword,
                request.body.newPassword
            )
            return new JSONResponse(response).send();
        }
    }
}