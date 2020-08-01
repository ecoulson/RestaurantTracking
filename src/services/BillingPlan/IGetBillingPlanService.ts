import Stripe from "stripe";
import AppType from "../../models/App/AppType";

export default interface IGetBillingPlanService {
    getBillingPlan(type: AppType) : Promise<Stripe.Plan[]>
}