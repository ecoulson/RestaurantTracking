import RestaurantRouteConfiguration from "./Restaurant/RestaurantRouteConfiguration";
import CheckInRouteConfiguration from "./CheckIn/CheckInRouteConfiguration";
import RouterConfiguration from "./RouterConfiguration";
import AuthenticationRouteConfiguration from "./Authentication/AuthenticationRouteConfiguration";
import UserRouteConfiguration from "./User/UserRouteConfiguration";
import OrganizationRouteConfiguration from "./Organization/OrganizationRouteConfiguration";
import CheckInController from "../controllers/CheckIn/CheckInController";
import CheckInService from "../services/CheckIn/CheckInService";
import OrganizationBroker from "../brokers/OrganizationBroker";
import GetCheckInService from "../services/CheckIn/GetCheckInService";
import CheckInBroker from "../brokers/CheckInBroker";
import PermissionBuilder from "../services/Permission/PermissionBuilder";
import UserBroker from "../brokers/UserBroker";
import CheckoutService from "../services/CheckIn/CheckoutService";
import SimpleCheckInQRService from "../services/CheckIn/SimpleCheckInQRService";
import BuildingRouterController from "./Building/BuildingRouteConfiguration";
import BuildingController from "../controllers/Building/BuildingController";
import CreateBuildingService from "../services/Building/CreateBuildingService";
import BuildingBroker from "../brokers/BuildingBroker";
import AppRouteConfiguration from "./App/AppRouteConfiguration";
import AppController from "../controllers/App/AppController";
import RegisterAppService from "../services/App/RegisterAppService";
import AppBroker from "../brokers/AppBroker";
import PermissionSetBroker from "../brokers/PermissionSetBroker";

export default class APIRouteConfiguration extends RouterConfiguration {
    configureRoutes() {
        this.router.use("/restaurant", new RestaurantRouteConfiguration().setup());
        this.router.use("/check_in", new CheckInRouteConfiguration(
            new CheckInController(
                new CheckInService(
                    new OrganizationBroker(),
                    new PermissionBuilder(),
                    new UserBroker()
                ),
                new GetCheckInService(
                    new CheckInBroker()
                ),
                new CheckoutService(
                    new CheckInBroker()
                ),
                new SimpleCheckInQRService()
            ),
            new OrganizationBroker(),
            new AppBroker()
        ).setup());
        this.router.use("/authentication", new AuthenticationRouteConfiguration().setup());
        this.router.use("/user", new UserRouteConfiguration().setup());
        this.router.use("/organization", new OrganizationRouteConfiguration().setup());
        this.router.use("/building", new BuildingRouterController(
            new BuildingController(new CreateBuildingService(new BuildingBroker())),
            new OrganizationBroker()
        ).setup())
        this.router.use("/app", new AppRouteConfiguration(
            new OrganizationBroker(),
            new AppController(
                new RegisterAppService(
                    new OrganizationBroker(),
                    new AppBroker(),
                    new PermissionBuilder(),
                    new PermissionSetBroker()
                )
            )
        ).setup())
    }
}