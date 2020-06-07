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
import ISpamVerificationService from "../../services/User/ISpamVerificationService";
import SpamVerificationService from "../../services/User/SpamVerificationService";

export default class UserController implements IUserController {
    private userRegistrationService : IUserRegistrationService;
    private verificationEmailService : IVerificationEmailService;
    private userVerificationService : IUserVerificationService;
    private spamVerificationService : ISpamVerificationService;

    constructor() {
        this.userRegistrationService = new UserRegistrationService();
        this.verificationEmailService = new VerificationEmailService();
        this.userVerificationService = new UserVerificationService();
        this.spamVerificationService = new SpamVerificationService();
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
            const verificationQuery = req.query as unknown as IVerificationQuery;
            await this.userVerificationService.verify(verificationQuery.token, verificationQuery.email);
            return new JSONResponse(res).send({});
        }
    }

    handleResendVerificationEmail() {
        return async (req : Request, res : Response) => {
            if (req.user.verified) {
                throw new Error(`User ${req.user.username} is already verified`);
            }
            const mailData = await this.verificationEmailService.sendVerificationEmail(req.user.email);
            return new JSONResponse(res).send(mailData);
        }
    }

    handleSpamVerification() {
        return async (req : Request, res : Response) => {
            const spamVerificationQuery = req.query as unknown as IVerificationQuery;
            const mailData = await this.spamVerificationService.cancelAccount(
                spamVerificationQuery.email,
                spamVerificationQuery.token
            );
            return new JSONResponse(res).send(mailData);
        }
    }
    
    handleForgotPassword() {
        return async (req : Request, res : Response) => {
            
        }
    }

}