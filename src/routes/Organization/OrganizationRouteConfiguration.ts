import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { OrganizationIdParametersSchema } from "./OrganizationSchema";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import IOrganizationController from "../../controllers/Organization/IOrganizationController";
import OrganizationController from "../../controllers/Organization/OrganizationController";
import OrganizationAccountRouteConfiguration from "./OrganizationAccountRouteConfiguration";
import OrganizationAccountController from "../../controllers/Organization/OrganizationAccount/OrganizationAccountController";
import OrganizationAccountExistsService from "../../services/Organization/OrganizationAccount/OrganizationAccountExistsService";
import OrganizationPINAuthenticationService from "../../services/Authentication/OrganizationPINAuthenticationService";
import OrganizationRegistrationRouteConfiguration from "./OrganizationRegistrationRouteConfiguration";
import OrganizationRegistrationController from "../../controllers/Organization/Registration/OrganizationRegistrationController";
import RegisterOrganizationService from "../../services/Organization/Registration/RegisterOrganizationService";

export default class OrganizationRouteConfiguration extends RouterConfiguration {
    private organizationController : IOrganizationController;

    constructor() {
        super();
        this.organizationController = new OrganizationController();
    }

    public configureRoutes(): void {
        this.router.use("/register", new OrganizationRegistrationRouteConfiguration(
            new OrganizationRegistrationController(
                new RegisterOrganizationService()
            )
        ).setup())

        this.router.get(
            '/:organizationId/name',
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.organizationController.handleGetOrganizationName())
        )

        this.router.use("/account", new OrganizationAccountRouteConfiguration(
            new OrganizationAccountController(
                new OrganizationAccountExistsService(),
                new OrganizationPINAuthenticationService()
            )
        ).setup())
    }
}