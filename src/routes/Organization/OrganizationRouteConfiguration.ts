import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import { OrganizationIdParametersSchema } from "./OrganizationSchema";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import IOrganizationController from "../../controllers/Organization/IOrganizationController";
import OrganizationAccountRouteConfiguration from "./OrganizationAccountRouteConfiguration";
import OrganizationRegistrationRouteConfiguration from "./OrganizationRegistrationRouteConfiguration";
import RegisterOrganizationAccountRouteConfiguration from "./RegisterOrganizationAccountRouteConfiguration";
import OrganizationBuildingRouteConfiguration from "./OrganizationBuildingRouteConfiguration";

export default class OrganizationRouteConfiguration extends RouterConfiguration {
    private organizationController : IOrganizationController;
    private registrationRoute : OrganizationRegistrationRouteConfiguration;
    private accountRoute : OrganizationAccountRouteConfiguration;
    private registerAccountRoute : RegisterOrganizationAccountRouteConfiguration;
    private buildingRoute : OrganizationBuildingRouteConfiguration;

    constructor(
        organizationController : IOrganizationController, 
        registrationRoute : OrganizationRegistrationRouteConfiguration,
        accountRoute : OrganizationAccountRouteConfiguration,
        registerAccountRoute : RegisterOrganizationAccountRouteConfiguration,
        buildingRoute : OrganizationBuildingRouteConfiguration,
    ) {
        super();
        this.organizationController = organizationController;
        this.registrationRoute = registrationRoute;
        this.accountRoute = accountRoute
        this.registerAccountRoute = registerAccountRoute;
        this.buildingRoute = buildingRoute;
    }

    public configureRoutes(): void {
        this.router.use("/register", this.registrationRoute.setup())

        this.router.get(
            '/:organizationId/name',
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.organizationController.handleGetOrganizationName())
        )

        this.router.get(
            '/:organizationId',
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.organizationController.handleGetOrganization())
        )

        this.router.use("/account", this.accountRoute.setup())

        this.router.use("/account", this.registerAccountRoute.setup())

        this.router.use("/buildings", this.buildingRoute.setup())
    }
}