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
import EncryptedTokenService from "../../../services/Token/EncryptedTokenService";
import Scope from "../../../services/Token/Scope";
import TokenBroker from "../../../brokers/TokenBroker";

export default class RegisterOrganizationAccountController implements IRegisterOrganizationAccountController {
    private registrationService : IRegisterOrganizationAccountService;
    private verifyUserService : IVerifyUserService;
    private anonymousRegistrationService : IRegisterOrganizationAccountService;
    private authenticationService : IAuthenticationService;
    private userBroker : UserBroker;

    constructor(
        registrationService : IRegisterOrganizationAccountService, 
        verifyUserService : IVerifyUserService,
        anonymousRegistrationService : IRegisterOrganizationAccountService,
        authenticationService : IAuthenticationService,
        userBroker : UserBroker
    ) {
        this.registrationService = registrationService;
        this.verifyUserService = verifyUserService;
        this.anonymousRegistrationService = anonymousRegistrationService;
        this.authenticationService = authenticationService;
        this.userBroker = userBroker;
    }

    handleRegistration() {
        return async (request : Request, response : Response) => {
            const user = await this.registrationService.register({
                username: request.body.username,
                organizationId: request.params.organizationId,
                email: request.body.email,
                password: request.body.password,
                firstName: request.body.firstName,
                lastName: request.body.lastName
            });
            if (!user.verified) {
                await this.verifyUserService.verify(new VerifyOrganizationAccountStrategy(
                    new EmailService(),
                    new EncryptedTokenService([Scope.VerifyEmail], 24, new TokenBroker()),
                    user
                ));
            }
            return new JSONResponse(response).send({
                user:user.serialize()
            });
        }
    }

    handleAnonymousRegistration() {
        return async (request : Request, response : Response) => {
            const user = await this.anonymousRegistrationService.register({
                username: v1(),
                email: v1(),
                password: v1(),
                firstName: "Anonymous",
                lastName: "Account",
                organizationId: request.params.organizationId
            });
            return new JSONResponse(response).send({
                user: user.serialize(),
                token: await this.authenticationService.generateAccessToken(user, true)
            })
        }
    }

    handleResendVerification() {
        return async (request : Request, response : Response) => {
            await this.verifyUserService.verify(new VerifyOrganizationAccountStrategy(
                new EmailService(),
                new EncryptedTokenService([Scope.VerifyEmail], 24, new TokenBroker()),
                await this.userBroker.findUserByEmail(request.body.email)
            ));
            return new JSONResponse(response).send({});
        }
    }
}