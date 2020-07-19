import RouterConfiguration from "../RouterConfiguration"
import { TokenBodySchema, TokenCallbackSchema, PasswordResetSchema } from "./UserSchema"
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware"
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware"
import PasswordRecoveryController from "../../controllers/User/PasswordRecovery/PasswordRecoveryController"
import IPasswordRecoveryController from "../../controllers/User/PasswordRecovery/IPasswordRecoveryController"
import IPasswordRecoveryService from "../../services/User/PasswordRecovery/IPasswordRecoveryService"

export default class PasswordRecoveryRouteConfiguration extends RouterConfiguration {
    private controller : IPasswordRecoveryController;

    constructor(passwordRecoveryService : IPasswordRecoveryService) {
        super()
        this.controller = new PasswordRecoveryController(passwordRecoveryService);
    }

    configureRoutes() {
        this.router.post(
            "/recover",
            new ValidationMiddleware(TokenBodySchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handlePasswordRecovery())
        )

        this.router.get(
            "/confirm",
            new ValidationMiddleware(TokenCallbackSchema).validateQuery(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handlePasswordResetConfirmation())
        )

        this.router.post(
            "/reset",
            new ValidationMiddleware(PasswordResetSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handlePasswordReset())
        )

        this.router.get(
            "/cancel_recover",
            new ValidationMiddleware(TokenCallbackSchema).validateQuery(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handlePasswordResetCancellation())
        )
    }
}