import IOrganizationAccountController from "./IOrganizationAccountController";
import { Request, Response } from "express";
import IOrganizationAccountExistsService from "../../../services/Organization/OrganizationAccount/IOrganizationAccountExistsService";
import IAuthenticationService from "../../../services/Authentication/IAuthenticationService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import OrganizationPINLoginArguments from "../../../services/Authentication/OrganizationPinLoginArguments";
import IUserVerificationService from "../../../services/User/Verification/IUserVerificationService";
import OrganizationAccountVerificationStrategy from "../../../services/Organization/OrganizationAccount/OrganizationAccountVerificationStrategy";
import UserBroker from "../../../brokers/UserBroker";
import EncryptedTokenService from "../../../services/Token/EncryptedTokenService";
import TokenBroker from "../../../brokers/TokenBroker";
import Scope from "../../../services/Token/Scope";

export default class OrganizationAccountController implements IOrganizationAccountController {
    private accountExistsService : IOrganizationAccountExistsService;
    private authenticationService : IAuthenticationService;
    private userVerificationService : IUserVerificationService;
    private tokenBroker : TokenBroker;

    constructor(
        accountService : IOrganizationAccountExistsService, 
        authenticationService : IAuthenticationService, 
        userVerificationService : IUserVerificationService,
        tokenBroker: TokenBroker
    ) {
        this.accountExistsService = accountService;
        this.authenticationService = authenticationService;
        this.userVerificationService = userVerificationService;
        this.tokenBroker = tokenBroker;
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
            return new JSONResponse(response).send({ 
                verified: user.verified,
                token 
            });
        }
    }

    handleVerification() {
        return async (request : Request, response : Response) => {
            const user = await this.userVerificationService.verify(new OrganizationAccountVerificationStrategy(
                new UserBroker(),
                request.body.email,
                request.body.password,
                new EncryptedTokenService([Scope.VerifyEmail], 24, this.tokenBroker),
                new TokenBroker()
            ))
            return new JSONResponse(response).send({ user })
        }
    }
}