import { Request } from "express";
import { CheckingInUserSchema, GetOrganizationCheckInsSchema, GetCheckInSchema, GetCheckInQRCode } from "./CheckInRouteSchemas";
import RouterConfiguration from "../RouterConfiguration";
import CheckInController from "../../controllers/CheckIn/CheckInController";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";
import OrganizationBroker from "../../brokers/OrganizationBroker";

export default class CheckInRouteConfiguration extends RouterConfiguration {
    private controller : CheckInController;
    private organizationBroker : OrganizationBroker

    constructor(checkInController : CheckInController, organizationBroker : OrganizationBroker) {
        super();
        this.controller = checkInController
        this.organizationBroker = organizationBroker
    }

    configureRoutes() {
        this.router.post(
            "/",
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Create, async (request : Request) => 
                [
                    new ResourceRequest(
                        (await this.organizationBroker.findOrganizationById(request.body.organizationId))._id, 
                        ResourceType.Organization
                    )
                ]
            ),
            new ValidationMiddleware(CheckingInUserSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleCheckIn())
        );

        this.router.get(
            "/", 
            new JSONWebTokenAuthenticationStrategy().authenticate(),  
            new ValidationMiddleware(GetOrganizationCheckInsSchema).validateQuery(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleGetReport())
        )

        this.router.get(
            "/:checkInId",
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Read, async (request) => 
                [
                    new ResourceRequest(
                        request.params.checkInId,
                        ResourceType.CheckIn
                    )
                ]),
            new ValidationMiddleware(GetCheckInSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleGetCheckIn())
        )

        this.router.post(
            "/checkout",
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (request) => 
                [
                    new ResourceRequest(
                        request.body.checkInId,
                        ResourceType.CheckIn
                    )
                ]
            ),
            new ValidationMiddleware(GetCheckInSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleCheckOut())
        )

        this.router.post(
            "/qr-code",
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Create, async (request) => 
                [
                    new ResourceRequest(
                        (await this.organizationBroker.findOrganizationById(request.body.organizationId))._id,
                        ResourceType.Organization
                    )
                ]
            ),
            new ValidationMiddleware(GetCheckInQRCode).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleGetQRCode())
        )
    }
}