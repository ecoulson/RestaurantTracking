import RouterConfiguration from "../RouterConfiguration";
import IOrganizationAccountController from "../../controllers/Organization/OrganizationAccount/IOrganizationAccountController";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import { ExistsBodySchema, OrganizationIdParametersSchema, OrganizationPINLoginSchema } from "./OrganizationSchema";

export default class OrganizationAccountRouteConfiguration extends RouterConfiguration {
    private controller : IOrganizationAccountController;

    constructor(controller : IOrganizationAccountController) {
        super();
        this.controller = controller;
    }

    configureRoutes() {
        this.router.post(
            '/:organizationId/exists',
            new ValidationMiddleware(ExistsBodySchema).validateBody(),
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleAccountExists())
        );

        this.router.post(
            '/:organizationId/login',
            new ValidationMiddleware(OrganizationPINLoginSchema).validateBody(),
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleLogin())
        )
    }
}