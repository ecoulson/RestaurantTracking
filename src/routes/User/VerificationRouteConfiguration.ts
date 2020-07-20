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
    }
}