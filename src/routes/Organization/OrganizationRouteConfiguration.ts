import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/validation/ValidationMiddleware";
import { OrganizationIdParametersSchema } from "./OrganizationSchema";
import ErrorCatchingMiddleware from "../../middleware/error-handling/ErrorCatchingMiddleware";
import IOrganizationController from "../../controllers/Organization/IOrganizationController";
import OrganizationController from "../../controllers/Organization/OrganizationController";
import OrganizationAccountRouteConfiguration from "./OrganizationAccountRouteConfiguration";
import OrganizationAccountController from "../../controllers/Organization/OrganizationAccount/OrganizationAccountController";
import OrganizationAccountExistsService from "../../services/Organization/OrganizationAccount/OrganizationAccountExistsService";
import OrganizationPINAuthenticationService from "../../services/Authentication/OrganizationPINAuthenticationService";
import OrganizationRegistrationRouteConfiguration from "./OrganizationRegistrationRouteConfiguration";
import OrganizationRegistrationController from "../../controllers/Organization/Registration/OrganizationRegistrationController";
import RegisterOrganizationService from "../../services/Organization/Registration/RegisterOrganizationService";
import RegisterOrganizationAccountRouteConfiguration from "./RegisterOrganizationAccountRouteConfiguration";
import RegisterOrganizationAccountController from "../../controllers/Organization/OrganizationAccount/RegisterOrganizationAccountController";
import RegisterOrganizationAccountService from "../../services/Organization/OrganizationAccount/RegistrationOrganizationAccountService";
import OrganizationBroker from "../../brokers/OrganizationBroker";
import UserPermissionSetupService from "../../services/User/Registration/UserPermissionSetupService";
import VerifyUserService from "../../services/User/Registration/VerifyUserService";
import Scope from "../../services/Token/Scope";
import UserBroker from "../../brokers/UserBroker";
import OrganizationUserVerificationEmailService from "../../services/Organization/OrganizationAccount/OrganizationUserVerificationEmailService";
import EncryptedTokenService from "../../services/Token/EncryptedTokenService";
import TokenBroker from "../../brokers/TokenBroker";
import OrganizationBuildingRouteConfiguration from "./OrganizationBuildingRouteConfiguration";
import OrganizationBuildingController from "../../controllers/Organization/Building/OrganizationBuildingController";
import GetBuildingService from "../../services/Building/GetBuildingService";
import BuildingBroker from "../../brokers/BuildingBroker";

export default class OrganizationRouteConfiguration extends RouterConfiguration {
    private organizationController : IOrganizationController;

    constructor() {
        super();
        this.organizationController = new OrganizationController();
    }

    public configureRoutes(): void {
        this.router.use("/register", new OrganizationRegistrationRouteConfiguration(
            new OrganizationRegistrationController(
                new RegisterOrganizationService()
            )
        ).setup())

        this.router.get(
            '/:organizationId/name',
            new ValidationMiddleware(OrganizationIdParametersSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.organizationController.handleGetOrganizationName())
        )

        this.router.use("/account", new OrganizationAccountRouteConfiguration(
            new OrganizationAccountController(
                new OrganizationAccountExistsService(),
                new OrganizationPINAuthenticationService()
            )
        ).setup())

        this.router.use("/account", new RegisterOrganizationAccountRouteConfiguration(
            new RegisterOrganizationAccountController(
                new RegisterOrganizationAccountService(
                    new OrganizationBroker(),
                    new UserPermissionSetupService(),
                ),
                new VerifyUserService(
                    new EncryptedTokenService([Scope.VerifyEmail], 24, new TokenBroker()),
                    new UserBroker(),
                    new OrganizationUserVerificationEmailService(
                        new EncryptedTokenService([Scope.VerifyEmail], 24, new TokenBroker())
                    )
                )
            )
        ).setup())

        this.router.use("/buildings", new OrganizationBuildingRouteConfiguration(
            new OrganizationBuildingController(
                new GetBuildingService(
                    new BuildingBroker()
                )
            )
        ).setup())
    }
}