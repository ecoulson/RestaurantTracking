import IUserRegistrationController from "./IUserRegistrationController";
import { RequestHandler, Request, Response } from "express";
import IUserRegistrationService from "../../../services/User/Registration/IUserRegistrationService";
import IUserPermissionSetupService from "../../../services/User/Registration/IUserPermissionSetupService";
import IRegistrationBody from "./IRegistrationBody";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import IUsernameAvailabilityService from "../../../services/User/Registration/IUsernameAvailabilityService";
import IVerifyUserService from "../../../services/User/Registration/IVerifyUserService";
import UserBroker from "../../../brokers/UserBroker";
import VerifyUserStrategy from "../../../services/User/Registration/VerifyUserStrategy";
import ITokenService from "../../../services/Token/ITokenService";
import IEmailService from "../../../services/Email/IEmailService";
import EmailService from "../../../services/Email/EmailService";

export default class UserRegistrationController implements IUserRegistrationController {
    private registrationService : IUserRegistrationService;
    private verifyService : IVerifyUserService;
    private permissionSetupService : IUserPermissionSetupService;
    private usernameAvailabilityService : IUsernameAvailabilityService;
    private tokenService : ITokenService;
    private userBroker : UserBroker;
    private emailService : IEmailService;

    constructor(
        registrationService : IUserRegistrationService,
        tokenService : ITokenService,
        userBroker : UserBroker,
        emailService : EmailService,
        permissionSetupService : IUserPermissionSetupService,
        verifyService : IVerifyUserService,
        usernameAvailableService : IUsernameAvailabilityService
    ) {
        this.registrationService = registrationService;
        this.tokenService = tokenService;
        this.userBroker = userBroker;
        this.emailService = emailService;
        this.permissionSetupService = permissionSetupService;
        this.verifyService = verifyService;
        this.usernameAvailabilityService = usernameAvailableService;
    }
    
    handleRegistration() : RequestHandler {
        return async (req : Request, res : Response) => {
            const registration = req.body as IRegistrationBody;
            const user = await this.registrationService.register(registration);
            await this.permissionSetupService.setup(user);
            const verifyUserStrategy = new VerifyUserStrategy(
                this.tokenService,
                this.userBroker,
                this.emailService,
                user.email,
            )
            await this.verifyService.verify(verifyUserStrategy);
            return new JSONResponse(res).send(user);
        }
    }

    handleResendVerificationEmail() {
        return async (req : Request, res : Response) => {
            if (req.user.verified) {
                throw new Error(`User ${req.user.username} is already verified`);
            }
            const verifyUserStrategy = new VerifyUserStrategy(
                this.tokenService,
                this.userBroker,
                this.emailService,
                req.user.email,
            )
            const user = await this.verifyService.verify(verifyUserStrategy);
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