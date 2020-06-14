import RouterConfiguration from "../RouterConfiguration"
import { TokenBodySchema, TokenCallbackSchema, PasswordResetSchema } from "./UserSchema"
import ErrorCatchingMiddlware from "../../middleware/error-handling/ErrorCatchingMiddleware"
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware"
import PasswordRecoveryController from "../../controllers/User/PasswordRecovery/PasswordRecoveryController"

export default class PasswordRecoveryRouteConfiguration extends RouterConfiguration<PasswordRecoveryController> {
    constructor() {
        super(new PasswordRecoveryController())
    }

    configureRoutes() {
        this.router.post(
            "/recover",
            new ValidationMiddleware(TokenBodySchema).validateBody(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handlePasswordRecovery())
        )

        this.router.get(
            "/confirm",
            new ValidationMiddleware(TokenCallbackSchema).validateQuery(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handlePasswordResetConfirmation())
        )

        this.router.post(
            "/reset",
            new ValidationMiddleware(PasswordResetSchema).validateBody(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handlePasswordReset())
        )

        this.router.get(
            "/cancel_recover",
            new ValidationMiddleware(TokenCallbackSchema).validateQuery(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handlePasswordResetCancelation())
        )
    }
}