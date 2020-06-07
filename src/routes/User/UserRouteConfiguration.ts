import RouterConfiguration from "../RouterConfiguration";
import UserController from "../../controllers/User/UserController";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { RegistrationBodySchema, VerificationQuerySchema, ResendVerificationEmailBodySchema } from "./UserSchema";
import ErrorCatchingMiddlware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import JSONWebTokenAuthenticationStrategy from "../../middleware/authentication/JSONWebTokenAuthenticationStrategy";

export default class UserRouteConfiguration extends RouterConfiguration<UserController> {
    constructor() {
        super(new UserController())
    }

    configureRoutes() {
        this.router.post(
            "/register",
            new ValidationMiddleware(RegistrationBodySchema).validateBody(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleRegistration())
        );

        this.router.post(
            "/send_verification",
            new ValidationMiddleware(ResendVerificationEmailBodySchema).validateBody(),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleResendVerificationEmail())
        )

        this.router.get(
            "/spam",
            new ValidationMiddleware(VerificationQuerySchema).validateQuery(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleSpamVerification())
        )

        this.router.get(
            "/verify",
            new ValidationMiddleware(VerificationQuerySchema).validateQuery(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleVerification())
        )
    }
}