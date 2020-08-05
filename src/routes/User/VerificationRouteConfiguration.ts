import RouterConfiguration from "../RouterConfiguration"
import VerificationController from "../../controllers/User/Verification/VerificationController"
import { TokenCallbackSchema } from "./UserSchema"
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware"
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware"
import IVerificationController from "../../controllers/User/Verification/IVerificationController"
import UserBroker from "../../brokers/UserBroker"
import TokenBroker from "../../brokers/TokenBroker"
import UserVerificationService from "../../services/User/Verification/UserVerificationService"
import SpamVerificationService from "../../services/User/Verification/SpamVerificationService"
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy"
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware"
import OperationType from "../../lib/Authorization/OperationType"
import ResourceType from "../../lib/Authorization/ResourceType"
import ResourceRequest from "../../lib/Authorization/ResourceRequest"

export default class VerificationRouteConfiguration extends RouterConfiguration {
    private controller : IVerificationController;

    constructor() {
        super()
        this.controller = new VerificationController(
            new UserBroker(),
            new TokenBroker(),
            new UserVerificationService(),
            new SpamVerificationService()
        );
    }

    configureRoutes() {
        this.router.get(
            "/spam",
            new ValidationMiddleware(TokenCallbackSchema).validateQuery(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleSpamVerification())
        )

        this.router.get(
            "/verify",
            new ValidationMiddleware(TokenCallbackSchema).validateQuery(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleVerification())
        )

        this.router.get(
            "/verified",
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Read, async (request) => {
                return [new ResourceRequest(request.user.id, ResourceType.User)]
            }),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleIsVerified())
        )
    }
}