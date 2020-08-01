import IGetBillingPlanService from "./IGetBillingPlanService";
import BillingPlanBroker from "../../brokers/BillingPlanBroker";
import AppType from "../../models/App/AppType";
import ProductType from "../../models/App/ProductType";

export default class GetBillingPlanService implements IGetBillingPlanService {
    private billingPlanBroker : BillingPlanBroker;

    constructor(billingPlanBroker : BillingPlanBroker) {
        this.billingPlanBroker = billingPlanBroker;
    }

    async getBillingPlan(type : AppType) {
        const products = await this.billingPlanBroker.getProducts();
        const product = products.data.filter((product) => {
            return product.metadata.AppType === type &&
                    product.metadata.ProductType === ProductType.App
        })[0]
        const prices = await this.billingPlanBroker.getPrices(product.id);
        return prices.data;
    }
}