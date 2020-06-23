import IPricingStrategy from "../Model/IPricingStrategy";
import IRestaurantPricingParameters from "./IRestaurantPricingParameters";
import RestaurantPricingBreakdown from "./RestaurantPricingBreakdown";

const basePrice = 10;
const userPrice = 1;

export default class RestaurantPricingStrategy implements IPricingStrategy {
    calculatePrice(parameters : IRestaurantPricingParameters) {
        return new RestaurantPricingBreakdown(basePrice + userPrice * (parameters.users));
    }
}