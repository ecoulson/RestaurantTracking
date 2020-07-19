import RouterConfiguration from "../RouterConfiguration"
import { TokenCallbackSchema, RegistrationBodySchema, UsernameCheckSchema } from "./UserSchema"
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware"
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware"
import UserRegistrationController from "../../controllers/User/Registration/UserRegistrationController"
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy"
import IUserRegistrationController from "../../controllers/User/Registration/IUserRegistrationController"

export default class UserRegistrationRouteConfiguration extends RouterConfiguration {
    private controller : IUserRegistrationController;

    constructor() {
        super();
        this.controller = new UserRegistrationController();
    }

    configureRoutes() {
        this.router.post(
            "/register",
            new ValidationMiddleware(RegistrationBodySchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleRegistration())
        );

        this.router.post(
            "/send_verification",
            new ValidationMiddleware(TokenCallbackSchema).validateBody(),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleResendVerificationEmail())
        )

        this.router.get(
            "/available/:username",
            new ValidationMiddleware(UsernameCheckSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleUsernameAvailability())
        )
    }
}