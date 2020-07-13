import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { SignOnBodySchema, SignOnParametersSchema, RegisterOrganizationSchema } from "./OrganizationSchema";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import IOrganizationController from "../../controllers/Organization/IOrganizationController";
import OrganizationController from "../../controllers/Organization/OrganizationController";

export default class OrganizationRouteConfiguration extends RouterConfiguration {
    private organizationController : IOrganizationController;

    constructor() {
        super();
        this.organizationController = new OrganizationController();
    }

    public configureRoutes(): void {
        this.router.post(
            '/:organizationId/sign-on',
            new ValidationMiddleware(SignOnBodySchema).validateBody(),
            new ValidationMiddleware(SignOnParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.organizationController.handleAccountSignOn())
        );

        this.router.post(
            '/register',
            new ValidationMiddleware(RegisterOrganizationSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.organizationController.handleOrganizationRegistration())
        )
    }
}