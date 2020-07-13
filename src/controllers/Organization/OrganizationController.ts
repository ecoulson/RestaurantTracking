import IOrganizationAccountService from "../../services/Organization/IOrganizationAccountService";
import OrganizationAccountService from "../../services/Organization/OrganizationAccountService";
import IOrganizationController from "./IOrganizationController";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IRegisterOrganizationService from "../../services/Organization/IRegisterOrganizationService";
import RegisterOrganizationService from "../../services/Organization/RegisterOrganizationService";

export default class OrganizationController implements IOrganizationController {
    private organizationAccountService : IOrganizationAccountService;
    private registerOrganization : IRegisterOrganizationService; 

    constructor() {
        this.organizationAccountService = new OrganizationAccountService();
        this.registerOrganization = new RegisterOrganizationService();
    }

    handleAccountSignOn() {
        return async (request : Request, response : Response) => {
            const isRegistered = await this.organizationAccountService.hasAccount(request.params.organizationId, request.body.email);
            new JSONResponse(response).send({ isRegistered })
        }
    }

    handleOrganizationRegistration() {
        return async (request : Request, response : Response) => {
            const organization = await this.registerOrganization.registerOrganization(
                request.body.organizationId, 
                request.body.organizationName
            );
            new JSONResponse(response).send({ organization });
        }
    }
}