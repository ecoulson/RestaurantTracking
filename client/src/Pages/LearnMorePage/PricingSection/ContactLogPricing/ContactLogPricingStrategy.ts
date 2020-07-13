import IPricingStrategy from "../Model/IPricingStrategy";
import IContactLogPricingParameters from "./IContactLogPricingParameters";
import ContactLogPricingBreakdown from "./ContactLogPricingBreakdown";
import IContactLogPricingBreakdown from "./IContactLogPricingBreakdown";

const standingDisplayPricing = 82;
const wallPricing = 15;
const tabletopPricing = 8;
const yearlyPrice = 1550;

export default class ContactLogPricingStrategy implements IPricingStrategy {
    calculatePrice(parameters : IContactLogPricingParameters) : IContactLogPricingBreakdown {
        return new ContactLogPricingBreakdown(
            yearlyPrice * 1.5,
            standingDisplayPricing * parameters.smallDisplays + 
                tabletopPricing * parameters.largeDisplays +
                wallPricing * parameters.wallDisplays
        );
    }
}