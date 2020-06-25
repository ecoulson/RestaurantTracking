import RouterConfiguration from "../RouterConfiguration";
import VerificationRouteConfiguration from "./VerificationRouteConfiguration";
import UserRegistrationRouteConfiguration from "./UserRegistrationRouteConfiguration";
import PasswordRecoveryRouteConfiguration from "./PasswordRecoveryRouteConfiguration";
import UserController from "../../controllers/User/UserController";
import JSONWebTokenAuthenticationStrategy from "../../middleware/authentication/JSONWebTokenAuthenticationStrategy";
import IUserController from "../../controllers/User/IUserController";
import ProfilePictureRouteConfiguration from "./ProfilePictureRouteConfiguration";

export default class UserRouteConfiguration extends RouterConfiguration {
    private controller : IUserController;

    constructor() {
        super();
        this.controller = new UserController();
    }

    configureRoutes() {
        this.router.use("/registration", new UserRegistrationRouteConfiguration().setup());
        this.router.use("/verification", new VerificationRouteConfiguration().setup());
        this.router.use("/password_recovery", new PasswordRecoveryRouteConfiguration().setup());
        this.router.use("/avatar", new ProfilePictureRouteConfiguration().setup())
        this.router.get(
            "/session", 
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            this.controller.handleGetSessionUser()
        );
    }
}