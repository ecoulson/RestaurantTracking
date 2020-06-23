import IPricingParameter from "./IPricingParameter";
import IPricingBreakdown from "./IPricingBreakdown";

export default interface IPricingStrategy {
    calculatePrice(pricingArgs? : IPricingParameter) : IPricingBreakdown;
}