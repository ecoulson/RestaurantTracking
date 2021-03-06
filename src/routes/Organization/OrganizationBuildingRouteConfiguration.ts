import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
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