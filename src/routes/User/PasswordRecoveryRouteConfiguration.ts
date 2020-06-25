import RouterConfiguration from "../RouterConfiguration"
import { TokenBodySchema, TokenCallbackSchema, PasswordResetSchema } from "./UserSchema"
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware"
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware"
import PasswordRecoveryController from "../../controllers/User/PasswordRecovery/PasswordRecoveryController"
import IPasswordRecoveryController from "../../controllers/User/PasswordRecovery/IPasswordRecoveryController"

export default class PasswordRecoveryRouteConfiguration extends RouterConfiguration {
    private controller : IPasswordRecoveryController;

    constructor() {
        super()
        this.controller = new PasswordRecoveryController();
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