import RouterConfiguration from "../RouterConfiguration";
import VerificationRouteConfiguration from "./VerificationRouteConfiguration";
import UserRegistrationRouteConfiguration from "./UserRegistrationRouteConfiguration";
import PasswordRecoveryRouteConfiguration from "./PasswordRecoveryRouteConfiguration";
import UserController from "../../controllers/User/UserController";
import JSONWebTokenAuthenticationStrategy from "../../middleware/authentication/JSONWebTokenAuthenticationStrategy";
import IUserController from "../../controllers/User/IUserController";
import ProfilePictureRouteConfiguration from "./ProfilePictureRouteConfiguration";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { UpdatedProfileSchema } from "./UserSchema";
import PasswordUpdateRouteConfiguration from "./PasswordUpdateRouteConfiguration";
import TokenService from "../../services/Token/TokenService";
import Scope from "../../services/Token/Scope";
import UserPasswordRecoveryService from "../../services/User/PasswordRecovery/UserPasswordRecoveryService";

export default class UserRouteConfiguration extends RouterConfiguration {
    private controller : IUserController;

    constructor() {
        super();
        this.controller = new UserController();
    }

    configureRoutes() {
        this.router.use("/registration", new UserRegistrationRouteConfiguration().setup());
        this.router.use("/verification", new VerificationRouteConfiguration().setup());
        this.router.use("/password_recovery", new PasswordRecoveryRouteConfiguration(
            new UserPasswordRecoveryService(
                new TokenService([Scope.ResetPassword], 1)
            )
        ).setup());
        this.router.use("/avatar", new ProfilePictureRouteConfiguration().setup())
        this.router.use("/password", new PasswordUpdateRouteConfiguration().setup());
        this.router.get(
            "/session", 
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Read, async (request) => {
                return [new ResourceRequest(request.user.id, ResourceType.User)]
            }),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleGetSessionUser())
        );
        this.router.put(
            "/",
            new ValidationMiddleware(UpdatedProfileSchema).validateBody(),
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (request) => {
                return [new ResourceRequest(request.user.id, ResourceType.User)]
            }),
            ErrorCatchingMiddleware.catchErrors(this.controller.handleUpdateSessionUserProfile())
        )
    }
}