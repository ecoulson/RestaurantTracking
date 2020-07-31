import RouterConfiguration from "../RouterConfiguration";
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";
import OrganizationBroker from "../../brokers/OrganizationBroker";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import IAppController from "../../controllers/App/IAppController";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import { GetAppSchema, CreateAppSchema } from "./AppRouteSchema";

export default class AppRouteConfiguration extends RouterConfiguration {
    private organizationBroker : OrganizationBroker;
    private appController : IAppController;

    constructor(organizationBroker : OrganizationBroker, appController : IAppController) {
        super();
        this.organizationBroker = organizationBroker;
        this.appController = appController
    }

    configureRoutes() {
        this.router.post(
            "/",
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Create, async (request) => [
                new ResourceRequest(
                    (await this.organizationBroker.findOrganizationById(request.body.organizationId)).id,
                    ResourceType.Organization
                )
            ]),
            new ValidationMiddleware(CreateAppSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.appController.handleRegisterApp())
        )

        this.router.get(
            "/:id",
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Create, async (request) => [
                new ResourceRequest(
                    request.params.id,
                    ResourceType.ContactLogApp
                )
            ]),
            new ValidationMiddleware(GetAppSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.appController.handleGetApp())
        )
    }
}