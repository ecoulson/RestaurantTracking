import RouterConfiguration from "../RouterConfiguration";
import IOrganizationAccountController from "../../controllers/Organization/OrganizationAccount/IOrganizationAccountController";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import { EmailBodySchema, OrganizationIdParametersSchema, OrganizationPINLoginSchema } from "./OrganizationSchema";
import PasswordRecoveryRouteConfiguration from "../User/PasswordRecoveryRouteConfiguration";
import EncryptedTokenService from "../../services/Token/EncryptedTokenService";
import Scope from "../../services/Token/Scope";
import TokenBroker from "../../brokers/TokenBroker";
import OrganizationAccountPasswordRecoverService from "../../services/Organization/OrganizationAccount/OrganizationAccountPasswordRecoveryService";
import { Request } from "express";

export default class OrganizationAccountRouteConfiguration extends RouterConfiguration {
    private controller : IOrganizationAccountController;

    constructor(controller : IOrganizationAccountController) {
        super();
        this.controller = controller;
    }

    configureRoutes() {
        this.router.post(
            '/:organizationId/exists',
            new ValidationMiddleware(EmailBodySchema).validateBody(),
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleAccountExists())
        );

        this.router.post(
            '/:organizationId/login',
            new ValidationMiddleware(OrganizationPINLoginSchema).validateBody(),
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleLogin())
        )

        this.router.use(
            "/:organizationId", 
            (request : Request, response, next) => {
                const mapping = new Map<string, string>();
                mapping.set("organizationId", request.params.organizationId)
                request.tokenValues = mapping;
                next();
            },
            new PasswordRecoveryRouteConfiguration(
                new OrganizationAccountPasswordRecoverService(
                    new EncryptedTokenService([Scope.ResetPassword], 1, new TokenBroker())
                )
            ).setup()
        )
    }
}