import RestaurantRouteConfiguration from "./RestaurantRouteConfiguration";
import CheckInRouteConfiguration from "./CheckInRouteConfiguration";
import RouterConfiguration from "./RouterConfiguration";

export default class APIRouteConfiguration extends RouterConfiguration<{}> {
    configureRoutes() {
        this.use("/restaurant", new RestaurantRouteConfiguration());
        this.use("/check_in", new CheckInRouteConfiguration());
    }
}