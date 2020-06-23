import RouterConfiguration from "../RouterConfiguration";
import VerificationRouteConfiguration from "./VerificationRouteConfiguration";
import UserRegistrationRouteConfiguration from "./UserRegistrationRouteConfiguration";
import PasswordRecoveryRouteConfiguration from "./PasswordRecoveryRouteConfiguration";
import UserController from "../../controllers/User/UserController";
import JSONWebTokenAuthenticationStrategy from "../../middleware/authentication/JSONWebTokenAuthenticationStrategy";

export default class UserRouteConfiguration extends RouterConfiguration<UserController> {
    constructor() {
        super(new UserController())
    }

    configureRoutes() {
        this.router.use("/registration", new UserRegistrationRouteConfiguration().setup());
        this.router.use("/verification", new VerificationRouteConfiguration().setup());
        this.router.use("/password_recovery", new PasswordRecoveryRouteConfiguration().setup());
        this.router.get(
            "/session", 
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            this.controller.handleGetSessionUser()
        );
    }
}