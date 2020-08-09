import IGetBillingPlanService from "./IGetBillingPlanService";
import BillingPlanBroker from "../../brokers/BillingPlanBroker";
import AppType from "../../models/App/AppType";
import ProductType from "../../models/App/ProductType";
import Stripe from "stripe";

export default class GetBillingPlanService implements IGetBillingPlanService {
    private billingPlanBroker : BillingPlanBroker;

    constructor(billingPlanBroker : BillingPlanBroker) {
        this.billingPlanBroker = billingPlanBroker;
    }

    async getBillingPlan(type : AppType) {
        const plans = await this.billingPlanBroker.getProducts();
        const appPlan = this.getAppPlan(plans.data, type);
        if (!appPlan) {
            throw new Error(`No billing plans for ${AppType.ContactLogs}`)
        }
        const appPlanPrice = await this.billingPlanBroker.getPrices(appPlan.id);
        return appPlanPrice.data;
    }

    private getAppPlan(plans : Stripe.Product[], type : AppType) {
        return plans.filter(product => 
            product.metadata.AppType === type && 
            product.metadata.ProductType === ProductType.App)[0]
    }
}