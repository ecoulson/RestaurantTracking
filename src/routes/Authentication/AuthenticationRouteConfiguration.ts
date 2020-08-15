import RouterConfiguration from "../RouterConfiguration";
import AuthenticationController from "../../controllers/Authentication/AuthenticationController";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import { LoginBodySchema } from "./AuthenticationSchema";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";

export default class AuthenticationRouteConfiguration extends RouterConfiguration {
    private controller : AuthenticationController;

    constructor(authenticationController : AuthenticationController) {
        super();
        this.controller = authenticationController;
    }

    configureRoutes() {
        this.router.post(
            "/login", 
            new ValidationMiddleware(LoginBodySchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleLogin())
        );

        this.router.get(
            "/is_session_active",
            ErrorCatchingMiddleware.catchErrors(this.controller.isSessionActive())
        )
    }
}