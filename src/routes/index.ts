import RestaurantRouteConfiguration from "./Restaurant/RestaurantRouteConfiguration";
import CheckInRouteConfiguration from "./CheckIn/CheckInRouteConfiguration";
import RouterConfiguration from "./RouterConfiguration";

export default class APIRouteConfiguration extends RouterConfiguration<{}> {
    configureRoutes() {
        this.use("/restaurant", new RestaurantRouteConfiguration());
        this.use("/check_in", new CheckInRouteConfiguration());
    }
}