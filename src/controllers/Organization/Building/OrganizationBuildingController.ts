import IOrganizationBuildingController from "./IOrganizationBuildingController";
import { Request, Response } from "express";
import IGetBuildingService from "../../../services/Building/IGetBuildingService";
import JSONResponse from "../../../lib/HTTP/JSONResponse";

export default class OrganizationBuildingController implements IOrganizationBuildingController {
    private getBuildingsService : IGetBuildingService;

    constructor(getBuildingsService : IGetBuildingService) {
        this.getBuildingsService = getBuildingsService;
    }

    handleGetBuildings() {
        return async (request : Request, response : Response) => {
            const buildings = await this.getBuildingsService.getBuildings(request.params.organizationId);
            return new JSONResponse(response).send({ buildings });
        }
    }
}