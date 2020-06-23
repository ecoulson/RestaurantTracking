import RouterConfiguration from "../RouterConfiguration"
import VerificationController from "../../controllers/User/Verification/VerificationController"
import { TokenCallbackSchema } from "./UserSchema"
import ErrorCatchingMiddlware from "../../middleware/error-handling/ErrorCatchingMiddleware"
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware"

export default class VerificationRouteConfiguration extends RouterConfiguration<VerificationController> {
    constructor() {
        super(new VerificationController())
    }

    configureRoutes() {
        this.router.get(
            "/spam",
            new ValidationMiddleware(TokenCallbackSchema).validateQuery(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleSpamVerification())
        )

        this.router.get(
            "/verify",
            new ValidationMiddleware(TokenCallbackSchema).validateQuery(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleVerification())
        )
    }
}