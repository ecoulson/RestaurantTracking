import IOrganizationAccountController from "./IOrganizationAccountController";
import { Request, Response } from "express";
import IOrganizationAccountExistsService from "../../../services/Organization/OrganizationAccount/IOrganizationAccountExistsService";
import IAuthenticationService from "../../../services/Authentication/IAuthenticationService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import OrganizationPINLoginArguments from "../../../services/Authentication/OrganizationPinLoginArguments";

export default class OrganizationAccountController implements IOrganizationAccountController {
    private accountExistsService : IOrganizationAccountExistsService;
    private authenticationService : IAuthenticationService;

    constructor(accountService : IOrganizationAccountExistsService, authenticationService : IAuthenticationService) {
        this.accountExistsService = accountService;
        this.authenticationService = authenticationService;
    }

    handleAccountExists() {
        return async (request : Request, response : Response) => {
            const isRegistered = await this.accountExistsService.hasAccount(request.params.organizationId, request.body.email);
            new JSONResponse(response).send({ isRegistered })
        }
    }

    handleLogin() {
        return async (request : Request, response : Response) => {
            const user = await this.authenticationService.login(new OrganizationPINLoginArguments(
                request.body.email,
                request.body.PIN,
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
}