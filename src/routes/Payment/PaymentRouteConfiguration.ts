import RouterConfiguration from "../RouterConfiguration";
import IPaymentController from "../../controllers/Payment/IPaymentController";
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import { CreateCustomerBodySchema, CreateSubscriptionSchema, GetSetupIntentSchema, UpdatePaymentMethodSchema, CancelSubscriptionSchema, CreateInvoiceSchema } from "./PaymentSchema";

export default class PaymentRouteConfiguration extends RouterConfiguration {
    private paymentController : IPaymentController;

    constructor(paymentController: IPaymentController) {
        super();
        this.paymentController = paymentController;
    }

    configureRoutes() {
        this.router.post(
            '/create-customer',
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (req) => [
                new ResourceRequest(req.user.id, ResourceType.User)
            ]),
            new ValidationMiddleware(CreateCustomerBodySchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.paymentController.handleCreateCustomer())
        )

        this.router.post(
            '/create-subscription',
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (req) => [
                new ResourceRequest(req.user.id, ResourceType.User)
            ]),
            new ValidationMiddleware(CreateSubscriptionSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.paymentController.handleCreateSubscription())
        )

        this.router.get(
            '/get-setup-intent/:setupIntentId',
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Read, async (req) => [
                new ResourceRequest(req.user.id, ResourceType.User)
            ]),
            new ValidationMiddleware(GetSetupIntentSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.paymentController.handleGetSetupIntent())
        )

        this.router.post(
            '/update-payment-method',
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (req) => [
                new ResourceRequest(req.user.id, ResourceType.User)
            ]),
            new ValidationMiddleware(UpdatePaymentMethodSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.paymentController.handleUpdatePaymentMethod())
        )

        this.router.post(
            '/cancel-subscription',
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (req) => [
                new ResourceRequest(req.user.id, ResourceType.User)
            ]),
            new ValidationMiddleware(CancelSubscriptionSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.paymentController.handleCancelSubscription())
        )

        this.router.post(
            '/create-invoice',
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (req) => [
                new ResourceRequest(req.user.id, ResourceType.User)
            ]),
            new ValidationMiddleware(CreateInvoiceSchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.paymentController.handleCreateInvoice())
        )
    }
}