import IPricingBreakdown from "../Model/IPricingBreakdown";

export default interface IRestaurantPricingBreakdown extends IPricingBreakdown {
    monthly: number;
}