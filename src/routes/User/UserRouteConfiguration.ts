import RouterConfiguration from "../RouterConfiguration";
import VerificationRouteConfiguration from "./VerificationRouteConfiguration";
import UserRegistrationRouteConfiguration from "./UserRegistrationRouteConfiguration";
import PasswordRecoveryRouteConfiguration from "./PasswordRecoveryRouteConfiguration";

export default class UserRouteConfiguration extends RouterConfiguration<{}> {
    constructor() {
        super({})
    }

    configureRoutes() {
        this.router.use("/registration", new UserRegistrationRouteConfiguration().setup());
        this.router.use("/verification", new VerificationRouteConfiguration().setup());
        this.router.use("/password_recovery", new PasswordRecoveryRouteConfiguration().setup());
    }
}