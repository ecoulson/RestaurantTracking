import IPricingStrategy from "../Model/IPricingStrategy";
import IContactLogPricingParameters from "./IContactLogPricingParameters";
import ContactLogPricingBreakdown from "./ContactLogPricingBreakdown";
import IContactLogPricingBreakdown from "./IContactLogPricingBreakdown";

const standingDisplayPricing = 77.99;
const wallPricing = 12.99;
const tabletopPricing = 7.99;
const monthlyPrice = 40;

export default class ContactLogPricingStrategy implements IPricingStrategy {
    calculatePrice(parameters : IContactLogPricingParameters) : IContactLogPricingBreakdown {
        return new ContactLogPricingBreakdown(
            monthlyPrice,
            standingDisplayPricing * parameters.smallDisplays + 
                tabletopPricing * parameters.largeDisplays +
                wallPricing * parameters.wallDisplays
        );
    }
}