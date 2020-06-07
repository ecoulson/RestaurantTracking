import { Request, Response, RequestHandler } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IUserController from "./IUserController";
import IRegistrationBody from "./IRegistrationBody";
import IVerificationQuery from "./IVerificationQuery";
import IUserRegistrationService from "../../services/User/IUserRegistrationService";
import UserRegistrationService from "../../services/User/UserRegistrationService";
import IVerificationEmailService from "../../services/User/IVerificationEmailService";
import VerificationEmailService from "../../services/User/VerificationEmailService";
import IUserVerificationService from "../../services/User/IUserVerificationService";
import UserVerificationService from "../../services/User/UserVerificationService";

export default class UserController implements IUserController {
    private userRegistrationService : IUserRegistrationService;
    private verificationEmailService : IVerificationEmailService;
    private userVerificationService : IUserVerificationService;

    constructor() {
        this.userRegistrationService = new UserRegistrationService();
        this.verificationEmailService = new VerificationEmailService();
        this.userVerificationService = new UserVerificationService();
    }
    
    handleRegistration() : RequestHandler {
        return async (req : Request, res : Response) => {
            const registration = req.body as IRegistrationBody;
            const user = await this.userRegistrationService.register(registration);
            await this.verificationEmailService.sendVerificationEmail(user.email);
            return new JSONResponse(res).send(user);
        }
    }

    handleVerification() : RequestHandler {
        return async (req : Request, res : Response) => {
            const verification = req.query as unknown as IVerificationQuery;
            await this.userVerificationService.verify(verification.token, verification.email);
            return new JSONResponse(res).send({});
        }
    }

    async handleResendVerificationEmail() {
        return async (req : Request, res : Response) => {
            
            // await this.verificationEmailService.sendVerificationEmail()
        }
    }
    
    async handleForgotPassword() {
        return (req : Request, res : Response) => {
            
        }
    }

}