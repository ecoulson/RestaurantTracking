import IOrganizationAccountController from "./IOrganizationAccountController";
import { Request, Response } from "express";
import IOrganizationAccountExistsService from "../../../services/Organization/OrganizationAccount/IOrganizationAccountExistsService";
import IAuthenticationService from "../../../services/Authentication/IAuthenticationService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import OrganizationPINLoginArguments from "../../../services/Authentication/OrganizationPinLoginArguments";
import IUserVerificationService from "../../../services/User/Verification/IUserVerificationService";
import OrganizationAccountVerificationStrategy from "../../../services/Organization/OrganizationAccount/OrganizationAccountVerificationStrategy";
import UserBroker from "../../../brokers/UserBroker";

export default class OrganizationAccountController implements IOrganizationAccountController {
    private accountExistsService : IOrganizationAccountExistsService;
    private authenticationService : IAuthenticationService;
    private userVerificationService : IUserVerificationService;

    constructor(
        accountService : IOrganizationAccountExistsService, 
        authenticationService : IAuthenticationService, 
        userVerificationService : IUserVerificationService
    ) {
        this.accountExistsService = accountService;
        this.authenticationService = authenticationService;
        this.userVerificationService = userVerificationService;
    }

    handleAccountExists() {
        return async (request : Request, response : Response) => {
            const isRegistered = await this.accountExistsService.hasAccount(request.params.organizationId, request.body.email);
            const isVerified = await this.accountExistsService.isVerified(request.params.organizationId, request.body.email);
            new JSONResponse(response).send({ isRegistered, isVerified })
        }
    }

    handleLogin() {
        return async (request : Request, response : Response) => {
            const user = await this.authenticationService.login(new OrganizationPINLoginArguments(
                request.body.email,
                request.body.password,
                request.params.organizationId
            ));
            const token = await this.authenticationService.generateAccessToken(user, true);
            if (!user.verified) {
                return new JSONResponse(response).send({ 
                    verified: false,
                    token
                })
            }
            return new JSONResponse(response).send({ 
                verified: true,
                token 
            });
        }
    }

    handleVerification() {
        return async (request : Request, response : Response) => {
            const user = await this.userVerificationService.verify(new OrganizationAccountVerificationStrategy(
                new UserBroker(),
                request.body.email,
                request.body.password
            ))
            return new JSONResponse(response).send({ user })
        }
    }
}