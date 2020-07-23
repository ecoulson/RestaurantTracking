import IOrganizationController from "./IOrganizationController";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IRegisterOrganizationService from "../../services/Organization/Registration/IRegisterOrganizationService";
import RegisterOrganizationService from "../../services/Organization/Registration/RegisterOrganizationService";
import IGetOrganizationService from "../../services/Organization/IGetOrganizationService";
import GetOrganizationService from "../../services/Organization/GetOrganizationService";

export default class OrganizationController implements IOrganizationController {
    private registerOrganizationService : IRegisterOrganizationService;
    private getOrganizationService : IGetOrganizationService;

    constructor() {
        this.registerOrganizationService = new RegisterOrganizationService();
        this.getOrganizationService = new GetOrganizationService();
    }

    handleOrganizationRegistration() {
        return async (request : Request, response : Response) => {
            const organization = await this.registerOrganizationService.registerOrganization(
                request.body.organizationId, 
                request.body.organizationName,
                request.user
            );
            new JSONResponse(response).send({ organization });
        }
    }

    handleGetOrganizationName() {
        return async (request : Request, response : Response) => {
            const organization = await this.getOrganizationService.getOrganization(request.params.organizationId)
            new JSONResponse(response).send({ organizationName: organization.organizationName })
        }
    }
}