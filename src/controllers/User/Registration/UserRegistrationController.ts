import IUserRegistrationController from "./IUserRegistrationController";
import { RequestHandler, Request, Response } from "express";
import IUserRegistrationService from "../../../services/User/Registration/IUserRegistrationService";
import IVerificationEmailService from "../../../services/User/Registration/IVerificationEmailService";
import IUserPermissionSetupService from "../../../services/User/Registration/IUserPermissionSetupService";
import UserRegistrationService from "../../../services/User/Registration/UserRegistrationService";
import VerificationEmailService from "../../../services/User/Registration/VerificationEmailService";
import UserPermissionSetupService from "../../../services/User/Registration/UserPermissionSetupService";
import IRegistrationBody from "./IRegistrationBody";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import IUsernameAvailibilityService from "../../../services/User/Registration/IUsernameAvailibilityService";
import UsernameAvailibilityService from "../../../services/User/Registration/UsernameAvailibilityService";

export default class UserRegistrationController implements IUserRegistrationController {
    private userRegistrationService : IUserRegistrationService;
    private verificationEmailService : IVerificationEmailService;
    private userPermissionSetupService : IUserPermissionSetupService;
    private usernameAvailibilityService : IUsernameAvailibilityService;

    constructor() {
        this.userRegistrationService = new UserRegistrationService();
        this.verificationEmailService = new VerificationEmailService();
        this.userPermissionSetupService = new UserPermissionSetupService();
        this.usernameAvailibilityService = new UsernameAvailibilityService();
    }
    
    handleRegistration() : RequestHandler {
        return async (req : Request, res : Response) => {
            const registration = req.body as IRegistrationBody;
            const user = await this.userRegistrationService.register(registration);
            await this.userPermissionSetupService.setup(user);
            await this.verificationEmailService.sendVerificationEmail(user.email);
            return new JSONResponse(res).send(user);
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

    handleUsernameAvailibilty() {
        return async (req : Request, res : Response) => {
            const username : string = req.params.username as string;
            return new JSONResponse(res).send({
                availible: await this.usernameAvailibilityService.check(username)
            });
        }
    }
}