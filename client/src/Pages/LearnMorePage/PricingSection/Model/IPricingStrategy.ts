import IPricingParameter from "./IPricingParameter";
import IPricingBreakdown from "./IPricingBreakdown";

export default interface IPricingStrategy {
    getPriceBreakdown() : Map<string, number>;
    calculatePrice(pricingArgs? : IPricingParameter) : IPricingBreakdown;
}