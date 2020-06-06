import IUserService from "../../services/User/IUserService";
import UserService from "../../services/User/UserService";
import IUserController from "./IUserController";
import { Request, Response, RequestHandler } from "express";
import IRegistrationBody from "./IRegistrationBody";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IVerificationQuery from "./IVerificationQuery";

export default class UserController implements IUserController {
    private service : IUserService;

    constructor() {
        this.service = new UserService();
    }
    
    handleRegistration() : RequestHandler {
        return async (req : Request, res : Response) => {
            const registration = req.body as IRegistrationBody;
            const user = await this.service.register(registration);
            await this.service.sendVerificationEmail(user.email);
            return new JSONResponse(res).send(user);
        }
    }

    handleVerification() : RequestHandler {
        return async (req : Request, res : Response) => {
            const verification = req.query as unknown as IVerificationQuery;
            await this.service.verify(verification.token, verification.email);
            return new JSONResponse(res).send({});
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