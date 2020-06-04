import RestaurantRouteConfiguration from "./Restaurant/RestaurantRouteConfiguration";
import CheckInRouteConfiguration from "./CheckIn/CheckInRouteConfiguration";
import RouterConfiguration from "./RouterConfiguration";
import AuthenticationRouteConfiguration from "./Authentication/AuthenticationRouteConfiguration";

export default class APIRouteConfiguration extends RouterConfiguration<{}> {
    configureRoutes() {
        this.router.use("/restaurant", new RestaurantRouteConfiguration().setup());
        this.router.use("/check_in", new CheckInRouteConfiguration().setup());
        this.router.use("/authentication", new AuthenticationRouteConfiguration().setup())
    }
}