import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { PasswordUpdateSchema } from "./UserSchema";
import JSONWebTokenAuthenticationStrategy from "../../middleware/authentication/JSONWebTokenAuthenticationStrategy";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import IPasswordUpdateController from "../../controllers/User/PasswordUpdate/IPasswordUpdateController";
import PasswordUpdateController from "../../controllers/User/PasswordUpdate/PasswordUpdateController";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";

export default class PasswordUpdateRouteConfiguration extends RouterConfiguration {
    private controller : IPasswordUpdateController;

    constructor() {
        super();
        this.controller = new PasswordUpdateController();
    }

    public configureRoutes(): void {
        this.router.put(
            "/",
            new ValidationMiddleware(PasswordUpdateSchema).validateBody(),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, (request) => {
                return [new ResourceRequest(request.user.id, ResourceType.User)]
            }),
            ErrorCatchingMiddleware.catchErrors(this.controller.handlePasswordUpdate())
        )
    }

}