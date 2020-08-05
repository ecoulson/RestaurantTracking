import IPricingStrategy from "../Model/IPricingStrategy";
import IRestaurantPricingParameters from "./IOrganizationPricingParameters";
import OrganizationPricingBreakdown from "./OrganizationPricingBreakdown";

const basePrice = 10;
const userPrice = 1;

export default class OrganizationPricingStrategy implements IPricingStrategy {
    getPriceBreakdown() {
        return new Map<string, number>();
    }

    calculatePrice(parameters : IRestaurantPricingParameters) {
        return new OrganizationPricingBreakdown(basePrice + userPrice * (parameters.users));
    }
}