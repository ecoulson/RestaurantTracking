import RouterConfiguration from "../RouterConfiguration";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import IStripeWebhookController from "../../controllers/Webhooks/IStripeWebhookController";

export default class WebhookRouterConfiguration extends RouterConfiguration {
    private stripeWebhookController : IStripeWebhookController;

    constructor(stripeWebhookController : IStripeWebhookController) {
        super();
        this.stripeWebhookController = stripeWebhookController;
    }

    configureRoutes() {
        this.router.post(
            `/stripe`,
            ErrorCatchingMiddleware.catchErrors(this.stripeWebhookController.handleWebhook())
        )
    }
}