import RouterConfiguration from "../RouterConfiguration";
import AuthenticationController from "../../controllers/Authentication/AuthenticationController";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { LoginBodySchema } from "./AuthenticationSchema";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";

export default class AuthenticationRouteConfiguration extends RouterConfiguration {
    private controller : AuthenticationController;

    constructor() {
        super();
        this.controller = new AuthenticationController();
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