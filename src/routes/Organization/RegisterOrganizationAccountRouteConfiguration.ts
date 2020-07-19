import RouterConfiguration from "../RouterConfiguration";
import IRegisterOrganizationAccountController from "../../controllers/Organization/OrganizationAccount/IRegisterOrganizationAccountController";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import { OrganizationIdParametersSchema, OrganizationAccountRegistrationSchema, EmailBodySchema } from "./OrganizationSchema";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import JSONWebTokenAuthenticationStrategy from "../../middleware/authentication/JSONWebTokenAuthenticationStrategy";

export default class RegisterOrganizationAccountRouteConfiguration extends RouterConfiguration {
    private controller : IRegisterOrganizationAccountController;

    constructor(controller : IRegisterOrganizationAccountController) {
        super()
        this.controller = controller;
    }

    configureRoutes() {
        this.router.post(
            '/:organizationId/register',
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            new ValidationMiddleware(OrganizationAccountRegistrationSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleRegistration())
        )

        this.router.post(
            '/:organizationId/resend-verification',
            new ValidationMiddleware(EmailBodySchema).validateBody(),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleResendVerification())
        )
    }
}