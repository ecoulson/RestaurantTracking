import RouterConfiguration from "../RouterConfiguration";
import IOrganizationRegistrationController from "../../controllers/Organization/Registration/IOrganizationRegistrationController";
import { RegisterOrganizationSchema } from "./OrganizationSchema";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";

export default class OrganizationRegistrationRouteConfiguration extends RouterConfiguration {
    private controller : IOrganizationRegistrationController;

    constructor(controller : IOrganizationRegistrationController) {
        super();
        this.controller = controller;
    }

    configureRoutes() {
        this.router.post(
            '/',
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (request) => [
                new ResourceRequest(request.user._id, ResourceType.User)
            ]),
            new ValidationMiddleware(RegisterOrganizationSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleRegistration())
        )
    }
}