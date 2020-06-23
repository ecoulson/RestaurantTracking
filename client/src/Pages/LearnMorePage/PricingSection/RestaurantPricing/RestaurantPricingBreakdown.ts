import IRestaurantPricingBreakdown from "./IRestaurantPricingBreakdown";
import PricingModelType from "../Model/PricingModelType";

export default class RestaurantPricingBreakdown implements IRestaurantPricingBreakdown {
    public type: PricingModelType;
    public monthly: number;

    constructor(monthly : number) {
        this.type = PricingModelType.RestaurantRegistration;
        this.monthly = monthly;
    }
}