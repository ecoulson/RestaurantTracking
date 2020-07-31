import IOrganizationRegistrationController from "./IOrganizationRegistrationController";
import { Request, Response } from "express";
import IRegisterOrganizationService from "../../../services/Organization/Registration/IRegisterOrganizationService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";
import IOrganizationExistsService from "../../../services/Organization/Registration/IOrganizationExistsService";

export default class OrganizationRegistrationController implements IOrganizationRegistrationController {
    private registrationService : IRegisterOrganizationService;
    private existsService : IOrganizationExistsService;

    constructor(registrationService : IRegisterOrganizationService, existsService : IOrganizationExistsService) {
        this.registrationService = registrationService;
        this.existsService = existsService;
    } 

    handleRegistration() {
        return async (request : Request, response : Response) => {
            const organization = await this.registrationService.registerOrganization(
                request.body.organizationId, 
                request.body.organizationName,
                request.body.address,
                request.user
            );
            new JSONResponse(response).send({ organization });
        }
    }

    handleOrganizationExists() {
        return async (request : Request, response : Response) => {
            const exists = await this.existsService.exists(request.params.organizationId)
            new JSONResponse(response).send({exists});
        }
    }
}