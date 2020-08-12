import IOrganizationController from "./IOrganizationController";
import { Request, Response } from "express";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import IRegisterOrganizationService from "../../services/Organization/Registration/IRegisterOrganizationService";
import IGetOrganizationService from "../../services/Organization/IGetOrganizationService";

export default class OrganizationController implements IOrganizationController {
    private registerOrganizationService : IRegisterOrganizationService;
    private getOrganizationService : IGetOrganizationService;

    constructor(
        registerOrganizationService : IRegisterOrganizationService,
        getOrganizationService : IGetOrganizationService
    ) {
        this.registerOrganizationService = registerOrganizationService;
        this.getOrganizationService = getOrganizationService;
    }

    handleOrganizationRegistration() {
        return async (request : Request, response : Response) => {
            const organization = await this.registerOrganizationService.registerOrganization(
                request.body.organizationId, 
                request.body.organizationName,
                request.body.address,
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

    handleGetOrganization() {
        return async (request : Request, response : Response) => {
            const organization = await this.getOrganizationService.getOrganization(request.params.organizationId)
            new JSONResponse(response).send(organization)
        }
    }
}