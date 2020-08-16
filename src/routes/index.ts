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
import CreateInvoiceService from "../services/Payment/CreateInvoice/CreateInvoiceService";
import AppIsActiveService from "../services/App/AppIsActiveService";
import SyncCheckInsService from "../services/CheckIn/SyncCheckInsService";
import AuthenticationService from "../services/Authentication/AuthenticationService";
import OrganizationController from "../controllers/Organization/OrganizationController";
import TokenBroker from "../brokers/TokenBroker";
import AuthenticationController from "../controllers/Authentication/AuthenticationController";
import UserController from "../controllers/User/UserController";
import UserService from "../services/User/UserService";
import UserRegistrationRouteConfiguration from "./User/UserRegistrationRouteConfiguration";
import UserRegistrationController from "../controllers/User/Registration/UserRegistrationController";
import UserRegistrationService from "../services/User/Registration/UserRegistrationService";
import TokenService from "../services/Token/TokenService";
import Scope from "../services/Token/Scope";
import EmailService from "../services/Email/EmailService";
import EmailBroker from "../brokers/EmailBroker";
import UserPermissionSetupService from "../services/User/Registration/UserPermissionSetupService";
import PermissionSetService from "../services/Permission/PermissionSetService";
import VerifyUserService from "../services/User/Registration/VerifyUserService";
import UsernameAvailabilityService from "../services/User/Registration/UsernameAvailibilityService";
import VerificationRouteConfiguration from "./User/VerificationRouteConfiguration";
import PasswordRecoveryRouteConfiguration from "./User/PasswordRecoveryRouteConfiguration";
import ProfilePictureRouteConfiguration from "./User/ProfilePictureRouteConfiguration";
import PasswordUpdateRouteConfiguration from "./User/PasswordUpdateRouteConfiguration";
import UserPasswordRecoveryService from "../services/User/PasswordRecovery/UserPasswordRecoveryService";
import RegisterOrganizationService from "../services/Organization/Registration/RegisterOrganizationService";
import GetOrganizationService from "../services/Organization/GetOrganizationService";
import OrganizationRegistrationRouteConfiguration from "./Organization/OrganizationRegistrationRouteConfiguration";
import OrganizationRegistrationController from "../controllers/Organization/Registration/OrganizationRegistrationController";
import OrganizationExistsService from "../services/Organization/Registration/OrganizationExsitsService";
import OrganizationAccountRouteConfiguration from "./Organization/OrganizationAccountRouteConfiguration";
import OrganizationAccountController from "../controllers/Organization/OrganizationAccount/OrganizationAccountController";
import OrganizationAccountExistsService from "../services/Organization/OrganizationAccount/OrganizationAccountExistsService";
import UserVerificationService from "../services/User/Verification/UserVerificationService";
import RegisterOrganizationAccountRouteConfiguration from "./Organization/RegisterOrganizationAccountRouteConfiguration";
import RegisterOrganizationAccountController from "../controllers/Organization/OrganizationAccount/RegisterOrganizationAccountController";
import OrganizationBuildingRouteConfiguration from "./Organization/OrganizationBuildingRouteConfiguration";
import OrganizationBuildingController from "../controllers/Organization/Building/OrganizationBuildingController";
import GetBuildingService from "../services/Building/GetBuildingService";
import RegisterOrganizationAccountService from "../services/Organization/OrganizationAccount/RegistrationOrganizationAccountService";
import RegisterAnonymousOrganizationAccountService from "../services/Organization/OrganizationAccount/RegisterAnonymousOrganizationAccountService";

export default class APIRouteConfiguration extends RouterConfiguration {
    configureRoutes() {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2020-03-02"
        });
        const organizationBroker = new OrganizationBroker();
        const checkInBroker = new CheckInBroker();
        const userBroker = new UserBroker();
        const buildingBroker = new BuildingBroker();
        const stripeBroker = new StripeBroker(stripe);
        const appBroker = new AppBroker();
        const permissionBroker = new PermissionBroker();
        const permissionSetBroker = new PermissionSetBroker();
        const tokenBroker = new TokenBroker();
        const emailBroker = new EmailBroker();

        const emailService = new EmailService(emailBroker);
        const verificationTokenService = 
            new TokenService([Scope.VerifyEmail], 24, tokenBroker);
        const resetPasswordTokenService =
            new TokenService([Scope.ResetPassword], 1, tokenBroker);
        const permissionSetService = 
            new PermissionSetService(permissionSetBroker)
        const authenticationService = new AuthenticationService();

        this.router.use("/restaurant", new RestaurantRouteConfiguration().setup());
        this.router.use("/check_in", new CheckInRouteConfiguration(
            new CheckInController(
                new CheckInService(
                    organizationBroker,
                    new PermissionBuilder(),
                    userBroker,
                    appBroker
                ),
                new GetCheckInService(
                    checkInBroker
                ),
                new CheckoutService(
                    checkInBroker
                ),
                new SimpleCheckInQRService(
                    organizationBroker
                ),
                new SyncCheckInsService(
                    authenticationService,
                    checkInBroker,
                    permissionBroker,
                    permissionSetBroker,
                    userBroker
                )
            ),
            new OrganizationBroker(),
            appBroker
        ).setup());

        this.router.use("/authentication", new AuthenticationRouteConfiguration(
            new AuthenticationController(authenticationService)
        ).setup());

        this.router.use("/user", new UserRouteConfiguration(
            new UserController(
                new UserService()
            ),
            new UserRegistrationRouteConfiguration(
                new UserRegistrationController(
                    new UserRegistrationService(userBroker),
                    verificationTokenService,
                    userBroker,
                    emailService,
                    new UserPermissionSetupService(permissionSetService, userBroker),
                    new VerifyUserService(),
                    new UsernameAvailabilityService(userBroker)
                )
            ),
            new VerificationRouteConfiguration(),
            new PasswordRecoveryRouteConfiguration(
                new UserPasswordRecoveryService(
                    resetPasswordTokenService
                )
            ),
            new ProfilePictureRouteConfiguration(),
            new PasswordUpdateRouteConfiguration(),
        ).setup());

        this.router.use("/organization", new OrganizationRouteConfiguration(
            new OrganizationController(
                new RegisterOrganizationService(permissionSetService),
                new GetOrganizationService(organizationBroker)
            ),
            new OrganizationRegistrationRouteConfiguration(
                new OrganizationRegistrationController(
                    new RegisterOrganizationService(permissionSetService),
                    new OrganizationExistsService(organizationBroker)
                )
            ),
            new OrganizationAccountRouteConfiguration(
                new OrganizationAccountController(
                    new OrganizationAccountExistsService(organizationBroker),
                    authenticationService,
                    new UserVerificationService(),
                    tokenBroker
                )
            ),
            new RegisterOrganizationAccountRouteConfiguration(
                new RegisterOrganizationAccountController(
                    new RegisterOrganizationAccountService(
                        organizationBroker,
                        new UserPermissionSetupService(permissionSetService, userBroker),
                        userBroker
                    ),
                    new VerifyUserService(),
                    new RegisterAnonymousOrganizationAccountService(
                        userBroker,
                        new UserPermissionSetupService(permissionSetService, userBroker),
                        organizationBroker
                    ),
                    authenticationService,
                    userBroker
                )
            ),
            new OrganizationBuildingRouteConfiguration(
                new OrganizationBuildingController(
                    new GetBuildingService(
                        buildingBroker
                    )
                )
            )
        ).setup());

        this.router.use("/building", new BuildingRouterController(
            new BuildingController(new CreateBuildingService(
                buildingBroker,
                organizationBroker
            )),
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
                new GetAppService(appBroker),
                new AppIsActiveService(appBroker)
            )
        ).setup())

        this.router.use("/payment", new PaymentRouteConfiguration(
            new PaymentController(
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
                ),
                new CreateInvoiceService(stripeBroker)
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