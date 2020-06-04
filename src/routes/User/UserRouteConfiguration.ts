import RouterConfiguration from "../RouterConfiguration";
import UserController from "../../controllers/User/UserController";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { RegistrationBodySchema } from "./UserSchema";
import ErrorCatchingMiddlware from "../../middleware/error-handling/ErrorCatchingMiddleware";

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
    }
}