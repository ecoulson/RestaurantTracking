import RouterConfiguration from "../RouterConfiguration"
import { TokenCallbackSchema, RegistrationBodySchema } from "./UserSchema"
import ErrorCatchingMiddlware from "../../middleware/error-handling/ErrorCatchingMiddleware"
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware"
import UserRegistrationController from "../../controllers/User/Registration/UserRegistrationController"

export default class UserRegistrationRouteConfiguration extends RouterConfiguration<UserRegistrationController> {
    constructor() {
        super(new UserRegistrationController())
    }

    configureRoutes() {
        this.router.post(
            "/register",
            new ValidationMiddleware(RegistrationBodySchema).validateBody(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleRegistration())
        );

        this.router.post(
            "/send_verification",
            new ValidationMiddleware(TokenCallbackSchema).validateBody(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleResendVerificationEmail())
        )
    }
}