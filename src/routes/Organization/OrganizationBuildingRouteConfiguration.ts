import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import JSONWebTokenAuthenticationStrategy from "../../middleware/authentication/JSONWebTokenAuthenticationStrategy";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import IOrganizationBuildingController from "../../controllers/Organization/Building/IOrganizationBuildingController";
import { OrganizationBuildingsSchema } from "./OrganizationSchema";

export default class OrganizationBuildingRouteConfiguration extends RouterConfiguration {
    private buildingController : IOrganizationBuildingController;

    constructor(buildingController : IOrganizationBuildingController) {
        super();
        this.buildingController = buildingController;
    }

    configureRoutes() {
        this.router.get(
            '/:organizationId',
            new ValidationMiddleware(OrganizationBuildingsSchema).validateParams(),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            ErrorCatchingMiddleware.catchErrors(this.buildingController.handleGetBuildings())
        )
    }
}