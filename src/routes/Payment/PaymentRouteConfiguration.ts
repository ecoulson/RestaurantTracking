import RouterConfiguration from "../RouterConfiguration";
import IPaymentController from "../../controllers/Payment/IPaymentController";
import JSONWebTokenAuthenticationStrategy from "../../middleware/Authentication/JSONWebTokenAuthenticationStrategy";
import AuthorizationMiddleware from "../../middleware/Authorization/AuthorizationMiddleware";
import OperationType from "../../lib/Authorization/OperationType";
import ResourceRequest from "../../lib/Authorization/ResourceRequest";
import ResourceType from "../../lib/Authorization/ResourceType";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import { PaymentBodySchema } from "./PaymentSchema";

export default class PaymentRouteConfiguration extends RouterConfiguration {
    private paymentController : IPaymentController;

    constructor(paymentController: IPaymentController) {
        super();
        this.paymentController = paymentController;
    }

    configureRoutes() {
        this.router.post(
            '/payments', 
            new JSONWebTokenAuthenticationStrategy().authenticate(),
            new AuthorizationMiddleware().authorize(OperationType.Update, async (req) => [
                new ResourceRequest(req.user?.id, ResourceType.User)
            ]),
            new ValidationMiddleware(PaymentBodySchema).validateBody(),
            ErrorCatchingMiddleware.catchErrors(this.paymentController.handlePayment())
        )
    }
}