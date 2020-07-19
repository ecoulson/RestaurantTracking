import RouterConfiguration from "../RouterConfiguration"
import VerificationController from "../../controllers/User/Verification/VerificationController"
import { TokenCallbackSchema } from "./UserSchema"
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware"
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware"
import IVerificationController from "../../controllers/User/Verification/IVerificationController"

export default class VerificationRouteConfiguration extends RouterConfiguration {
    private controller : IVerificationController;

    constructor() {
        super()
        this.controller = new VerificationController();
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