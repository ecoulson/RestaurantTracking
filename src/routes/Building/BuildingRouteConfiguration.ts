import RouterConfiguration from "../RouterConfiguration";
import IBuildingController from "../../controllers/Building/IBuildingController";
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";
import OrganizationBroker from "../../brokers/OrganizationBroker";

export default class BuildingRouterController extends RouterConfiguration {
    private buildingController : IBuildingController;
    private organizationBroker : OrganizationBroker;

    constructor(buildingController : IBuildingController, organizationBroker : OrganizationBroker) {
        super();
        this.buildingController = buildingController;
        this.organizationBroker = organizationBroker;
    }

    configureRoutes() {
        this.router.post(
            "/",
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Create, async (request) => [
                new ResourceRequest(
                    (await this.organizationBroker.findOrganizationById(request.body.organizationId))._id,
                    ResourceType.Organization
                )
            ]),
            ErrorCatchingMiddleware.catchErrors(this.buildingController.handleCreate())
        );
    }
}