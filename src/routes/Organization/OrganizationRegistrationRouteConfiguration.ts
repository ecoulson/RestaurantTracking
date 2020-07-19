import RouterConfiguration from "../RouterConfiguration";
import IOrganizationRegistrationController from "../../controllers/Organization/Registration/IOrganizationRegistrationController";
import { RegisterOrganizationSchema } from "./OrganizationSchema";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";

export default class OrganizationRegistrationRouteConfiguration extends RouterConfiguration {
    private controller : IOrganizationRegistrationController;

    constructor(controller : IOrganizationRegistrationController) {
        super();
        this.controller = controller;
    }

    configureRoutes() {
        this.router.post(
            '/',
            new ValidationMiddleware(RegisterOrganizationSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleRegistration())
        )
    }
}