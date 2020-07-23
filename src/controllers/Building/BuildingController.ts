import IBuildingController from "./IBuildingController";
import { Request, Response } from "express";
import ICreateBuildingService from "../../services/Building/ICreateBuildingService";
import JSONResponse from "../../lib/HTTP/JSONResponse";

export default class BuildingController implements IBuildingController {
    private createService : ICreateBuildingService;

    constructor(createService : ICreateBuildingService) {
        this.createService = createService;
    }

    handleCreate() {
        return async (request : Request, response : Response) => {
            await this.createService.create(
                request.body.buildingName,
                request.body.organizationId,
                request.body.buildingType
            )
            return new JSONResponse(response).send({});
        }
    }
}