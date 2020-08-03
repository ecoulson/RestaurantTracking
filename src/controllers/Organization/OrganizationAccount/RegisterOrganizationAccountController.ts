import IRegisterOrganizationAccountController from "./IRegisterOrganizationAccountController";
import { Request, Response } from "express";
import IRegisterOrganizationAccountService from "../../../services/Organization/OrganizationAccount/IRegisterOrganizationAccountService";
import IVerifyUserService from "../../../services/User/Registration/IVerifyUserService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import VerifyOrganizationAccountStrategy from "./VerifyOrganizationAccountStrategy";
import UserBroker from "../../../brokers/UserBroker";
import EmailService from "../../../services/Email/EmailService";
import { v1 } from "uuid"
import IAuthenticationService from "../../../services/Authentication/IAuthenticationService";

export default class RegisterOrganizationAccountController implements IRegisterOrganizationAccountController {
    private registrationService : IRegisterOrganizationAccountService;
    private verifyUserService : IVerifyUserService;
    private anonymousRegistrationService : IRegisterOrganizationAccountService;
    private authenticationService : IAuthenticationService;

    constructor(
        registrationService : IRegisterOrganizationAccountService, 
        verifyUserService : IVerifyUserService,
        anonymousRegistrationService : IRegisterOrganizationAccountService,
        authenticationService : IAuthenticationService
    ) {
        this.registrationService = registrationService;
        this.verifyUserService = verifyUserService;
        this.anonymousRegistrationService = anonymousRegistrationService;
        this.authenticationService = authenticationService;
    }

    handleRegistration() {
        return async (request : Request, response : Response) => {
            const password = v1()
            const user = await this.registrationService.register(
                request.body.email,
                password,
                request.params.organizationId
            );
            if (!user.verified) {
                await this.verifyUserService.verify(new VerifyOrganizationAccountStrategy(
                    new UserBroker(),
                    new EmailService(),
                    user.email
                ));
            }
            return new JSONResponse(response).send({
                user:user.serialize()
            });
        }
    }

    handleAnonymousRegistration() {
        return async (request : Request, response : Response) => {
            const user = await this.anonymousRegistrationService.register(
                v1(),
                v1(),
                request.params.organizationId
            );
            return new JSONResponse(response).send({
                user: user.serialize(),
                token: await this.authenticationService.generateAccessToken(user, true)
            })
        }
    }

    handleResendVerification() {
        return async (request : Request, response : Response) => {
            await this.verifyUserService.verify(new VerifyOrganizationAccountStrategy(
                new UserBroker(),
                new EmailService(),
                request.body.email
            ));
            return new JSONResponse(response).send({});
        }
    }
}