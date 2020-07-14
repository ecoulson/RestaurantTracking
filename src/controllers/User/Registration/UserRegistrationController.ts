import IUserRegistrationController from "./IUserRegistrationController";
import { RequestHandler, Request, Response } from "express";
import IUserRegistrationService from "../../../services/User/Registration/IUserRegistrationService";
import IUserPermissionSetupService from "../../../services/User/Registration/IUserPermissionSetupService";
import UserRegistrationService from "../../../services/User/Registration/UserRegistrationService";
import UserPermissionSetupService from "../../../services/User/Registration/UserPermissionSetupService";
import IRegistrationBody from "./IRegistrationBody";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import IUsernameAvailabilityService from "../../../services/User/Registration/IUsernameAvailabilityService";
import UsernameAvailabilityService from "../../../services/User/Registration/UsernameAvailibilityService";
import IVerifyUserService from "../../../services/User/Registration/IVerifyUserService";
import VerifyUserService from "../../../services/User/Registration/VerifyUserService";
import TokenService from "../../../services/Token/TokenService";
import Scope from "../../../services/Token/Scope";
import UserBroker from "../../../brokers/UserBroker";
import UserVerificationEmailService from "../../../services/User/Registration/UserVerificationEmailService";

export default class UserRegistrationController implements IUserRegistrationController {
    private registrationService : IUserRegistrationService;
    private verifyService : IVerifyUserService;
    private permissionSetupService : IUserPermissionSetupService;
    private usernameAvailabilityService : IUsernameAvailabilityService;

    constructor() {
        this.registrationService = new UserRegistrationService();
        this.verifyService = new VerifyUserService(
            new TokenService([Scope.VerifyEmail], 24),
            new UserBroker(),
            new UserVerificationEmailService()
        );
        this.permissionSetupService = new UserPermissionSetupService();
        this.usernameAvailabilityService = new UsernameAvailabilityService();
    }
    
    handleRegistration() : RequestHandler {
        return async (req : Request, res : Response) => {
            const registration = req.body as IRegistrationBody;
            const user = await this.registrationService.register(registration);
            await this.permissionSetupService.setup(user);
            await this.verifyService.verify(user.email, new Map<string, string>());
            return new JSONResponse(res).send(user);
        }
    }

    handleResendVerificationEmail() {
        return async (req : Request, res : Response) => {
            if (req.user.verified) {
                throw new Error(`User ${req.user.username} is already verified`);
            }
            const user = await this.verifyService.verify(req.user.email, new Map<string, string>());
            return new JSONResponse(res).send(user);
        }
    }

    handleUsernameAvailability() {
        return async (req : Request, res : Response) => {
            const username : string = req.params.username as string;
            return new JSONResponse(res).send({
                available: await this.usernameAvailabilityService.check(username)
            });
        }
    }
}