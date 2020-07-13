import RestaurantRouteConfiguration from "./Restaurant/RestaurantRouteConfiguration";
import CheckInRouteConfiguration from "./CheckIn/CheckInRouteConfiguration";
import RouterConfiguration from "./RouterConfiguration";
import AuthenticationRouteConfiguration from "./Authentication/AuthenticationRouteConfiguration";
import UserRouteConfiguration from "./User/UserRouteConfiguration";
import OrganizationRouteConfiguration from "./Organization/OrganizationRouteConfiguration";

export default class APIRouteConfiguration extends RouterConfiguration {
    configureRoutes() {
        this.router.use("/restaurant", new RestaurantRouteConfiguration().setup());
        this.router.use("/check_in", new CheckInRouteConfiguration().setup());
        this.router.use("/authentication", new AuthenticationRouteConfiguration().setup());
        this.router.use("/user", new UserRouteConfiguration().setup());
        this.router.use("/organization", new OrganizationRouteConfiguration().setup());
    }
}