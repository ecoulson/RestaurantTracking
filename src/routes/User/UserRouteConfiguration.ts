import RouterConfiguration from "../RouterConfiguration";
import VerificationRouteConfiguration from "./VerificationRouteConfiguration";
import UserRegistrationRouteConfiguration from "./UserRegistrationRouteConfiguration";
import PasswordRecoveryRouteConfiguration from "./PasswordRecoveryRouteConfiguration";
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy";
import IUserController from "../../controllers/User/IUserController";
import ProfilePictureRouteConfiguration from "./ProfilePictureRouteConfiguration";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import { UpdatedProfileSchema } from "./UserSchema";
import PasswordUpdateRouteConfiguration from "./PasswordUpdateRouteConfiguration";

export default class UserRouteConfiguration extends RouterConfiguration {
    private controller : IUserController;
    private registrationRoute : UserRegistrationRouteConfiguration;
    private verificationRoute : VerificationRouteConfiguration;
    private passwordRecoveryRoute : PasswordRecoveryRouteConfiguration;
    private profilePictureRoute : ProfilePictureRouteConfiguration;
    private passwordUpdateRoute : PasswordUpdateRouteConfiguration;

    constructor(
        controller : IUserController,
        registrationRoute : UserRegistrationRouteConfiguration,
        verificationRoute : VerificationRouteConfiguration,
        passwordRecoveryRoute : PasswordRecoveryRouteConfiguration,
        profilePictureRoute : ProfilePictureRouteConfiguration,
        passwordUpdateRoute : PasswordUpdateRouteConfiguration,
    ) {
        super();
        this.controller = controller;
        this.registrationRoute = registrationRoute;
        this.verificationRoute = verificationRoute;
        this.passwordRecoveryRoute = passwordRecoveryRoute;
        this.profilePictureRoute = profilePictureRoute;
        this.passwordUpdateRoute = passwordUpdateRoute;
    }

    configureRoutes() {
        this.router.use("/registration", this.registrationRoute.setup());
        this.router.use("/verification", this.verificationRoute.setup());
        this.router.use("/password_recovery", this.passwordRecoveryRoute.setup());
        this.router.use("/avatar", this.profilePictureRoute.setup())
        this.router.use("/password", this.passwordUpdateRoute.setup());
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