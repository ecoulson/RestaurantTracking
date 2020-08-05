import RouterConfiguration from "../RouterConfiguration";
import IBillingPlanController from "../../controllers/BillingPlan/IBillingPlanController";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";

export default class BillingPlanRouter extends RouterConfiguration {
    private billingPlanController : IBillingPlanController;

    constructor(billingPlanController : IBillingPlanController) {
        super()
        this.billingPlanController = billingPlanController;
    }

    configureRoutes() {
        this.router.get(
            '/:type',
            ErrorCatchingMiddleware.catchErrors(this.billingPlanController.handleGetBillingPlan())
        )
    }
}