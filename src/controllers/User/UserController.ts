import IUserService from "../../services/User/IUserService";
import UserService from "../../services/User/UserService";
import IUserController from "./IUserController";
import { Request, Response, RequestHandler } from "express";
import IRegistrationBody from "./IRegistrationBody";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import { logger } from "../../lib/logging";

export default class UserController implements IUserController {
    private service : IUserService;

    constructor() {
        this.service = new UserService();
    }
    
    handleRegistration() : RequestHandler {
        return async (req : Request, res : Response) => {
            const registration = req.body as IRegistrationBody;
            logger.debug(registration);
            const user = await this.service.register(registration);
            logger.debug(user);
            return new JSONResponse(res).send(user);
        }
    }

    async handleResendVerificationEmail() {
        return (req : Request, res : Response) => {
            
        }
    }
    
    async handleForgotPassword() {
        return (req : Request, res : Response) => {
            
        }
    }

}