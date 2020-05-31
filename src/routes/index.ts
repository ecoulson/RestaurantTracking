import RestaurantRouteConfiguration from "./Restaurant/RestaurantRouteConfiguration";
import CheckInRouteConfiguration from "./CheckIn/CheckInRouteConfiguration";
import RouterConfiguration from "./RouterConfiguration";
import * as app from "../app";

export default class APIRouteConfiguration extends RouterConfiguration<{}> {
    configureRoutes() {
        this.router.use("/restaurant", new RestaurantRouteConfiguration().setup());
        this.router.use("/check_in", new CheckInRouteConfiguration().setup());
    }
}