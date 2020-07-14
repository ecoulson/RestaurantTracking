import IOrganizationRegistrationController from "./IOrganizationRegistrationController";
import { Request, Response } from "express";
import IRegisterOrganizationService from "../../../services/Organization/Registration/IRegisterOrganizationService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";

export default class OrganizationRegistrationController implements IOrganizationRegistrationController {
    private registrationService : IRegisterOrganizationService;

    constructor(registrationService : IRegisterOrganizationService) {
        this.registrationService = registrationService;
    } 

    handleRegistration() {
        return async (request : Request, response : Response) => {
            const organization = await this.registrationService.registerOrganization(
                request.body.organizationId, 
                request.body.organizationName
            );
            new JSONResponse(response).send({ organization });
        }
    }
}