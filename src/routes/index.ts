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
import PaymentRouteConfiguration from "./Payment/PaymentRouteConfiguration";
import PaymentController from "../controllers/Payment/PaymentController";
import PaymentService from "../services/Payment/PaymentService";
import StripeBroker from "../brokers/StripeBroker";
import Stripe from "stripe";
import WebhookRouterConfiguration from "./Webhook/WebhookRouterConfiguration";
import StripeWebhookController from "../controllers/Webhooks/StripeWebhookController";
import StripeWebhookService from "../services/Webhooks/StripeWebhookService";
import CreateCustomerService from "../services/Payment/CreateCustomer/CreateCustomerService";
import CreateSubscriptionService from "../services/Payment/CreateSubscription/CreateSubscriptionService";
import AppActivationHandler from "../services/Stripe/AppActivationHandler";
import GetSetupIntentService from "../services/Payment/SetupIntent/GetSetupIntentService";
import UpdatePaymentMethodService from "../services/Payment/UpdatePaymentMethod/UpdatePaymentMethodService";
import CancelSubscriptionService from "../services/Payment/CancelSubscription/CancelSubscriptionService";
import GetAppService from "../services/App/GetAppService";
import PermissionBroker from "../brokers/PermissionBroker";
import BillingPlanRouter from "./BillingPlan/BillingPlanRouter";
import BillingPlanBroker from "../brokers/BillingPlanBroker";
import BillingPlanController from "../controllers/BillingPlan/BillingPlanController";
import GetBillingPlanService from "../services/BillingPlan/GetBillingPlanService";
import ProductPricesController from "../controllers/ProductPrices/ProductPricesController";
import ProductPricesRouter from "./ProductPrices/ProductPricesRouter";
import GetProductPricesService from "../services/ProductPrices/GetProductPricesService";

export default class APIRouteConfiguration extends RouterConfiguration {
    configureRoutes() {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2020-03-02"
        });
        const organizationBroker = new OrganizationBroker();
        const checkInBroker = new CheckInBroker();
        const userBroker = new UserBroker();
        const stripeBroker = new StripeBroker(stripe);
        const appBroker = new AppBroker();
        const permissionBroker = new PermissionBroker();
        const permissionSetBroker = new PermissionSetBroker();

        this.router.use("/restaurant", new RestaurantRouteConfiguration().setup());
        this.router.use("/check_in", new CheckInRouteConfiguration(
            new CheckInController(
                new CheckInService(
                    organizationBroker,
                    new PermissionBuilder(),
                    userBroker
                ),
                new GetCheckInService(
                    checkInBroker
                ),
                new CheckoutService(
                    checkInBroker
                ),
                new SimpleCheckInQRService()
            ),
            new OrganizationBroker(),
            appBroker
        ).setup());

        this.router.use("/authentication", new AuthenticationRouteConfiguration().setup());

        this.router.use("/user", new UserRouteConfiguration().setup());

        this.router.use("/organization", new OrganizationRouteConfiguration().setup());

        this.router.use("/building", new BuildingRouterController(
            new BuildingController(new CreateBuildingService(new BuildingBroker())),
            organizationBroker
        ).setup())

        this.router.use("/app", new AppRouteConfiguration(
            new OrganizationBroker(),
            new AppController(
                new RegisterAppService(
                    organizationBroker,
                    appBroker,
                    new PermissionBuilder(),
                    permissionSetBroker
                ),
                new GetAppService(appBroker)
            )
        ).setup())

        this.router.use("/payment", new PaymentRouteConfiguration(
            new PaymentController(
                new PaymentService(stripeBroker),
                new CreateCustomerService(stripeBroker, organizationBroker),
                new CreateSubscriptionService(stripeBroker),
                new GetSetupIntentService(stripeBroker),
                new UpdatePaymentMethodService(stripeBroker),
                new CancelSubscriptionService(
                    stripeBroker, 
                    appBroker, 
                    organizationBroker, 
                    permissionBroker, 
                    permissionSetBroker
                )
            )
        ).setup())

        this.router.use("/webhooks", new WebhookRouterConfiguration(
            new StripeWebhookController(stripeBroker, new StripeWebhookService([
                new AppActivationHandler(appBroker)
            ]))
        ).setup())

        this.router.use("/billing-plan", new BillingPlanRouter(
            new BillingPlanController(
                new GetBillingPlanService(
                    new BillingPlanBroker(stripe)
                )
            )
        ).setup())

        this.router.use("/product-prices", new ProductPricesRouter(
            new ProductPricesController(
                new GetProductPricesService(
                    stripeBroker
                )
            )
        ).setup())
    }
}