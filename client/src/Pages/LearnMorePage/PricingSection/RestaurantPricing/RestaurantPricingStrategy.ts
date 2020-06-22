import IPricingStrategy from "../Model/IPricingStrategy";
import IRestaurantPricingParameters from "./IRestaurantPricingParameters";

const basePrice = 10;
const userPrice = 1;

export default class RestaurantPricingStrategy implements IPricingStrategy {
    calculatePrice(parameters : IRestaurantPricingParameters) {
        return basePrice + userPrice * (parameters.users);
    }
}