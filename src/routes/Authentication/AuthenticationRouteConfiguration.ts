import RouterConfiguration from "../RouterConfiguration";
import AuthenticationController from "../../controllers/Authentication/AuthenticationController";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { LoginBodySchema } from "./AuthenticationSchema";
import ErrorCatchingMiddlware from "../../middleware/error-handling/ErrorCatchingMiddleware";

export default class AuthenticationRouteConfiguration extends RouterConfiguration<AuthenticationController> {
    constructor() {
        super(new AuthenticationController());
    }

    configureRoutes() {
        this.router.post(
            "/login", 
            new ValidationMiddleware(LoginBodySchema).validateBody(),
            ErrorCatchingMiddlware.catchErrors(this.controller.handleLogin())
        );
    }


}