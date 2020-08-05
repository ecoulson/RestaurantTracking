import IPricingStrategy from "../Model/IPricingStrategy";
import IContactLogPricingParameters from "./IContactLogPricingParameters";
import ContactLogPricingBreakdown from "./ContactLogPricingBreakdown";
import IContactLogPricingBreakdown from "./IContactLogPricingBreakdown";

const standingDisplayPricing = 82;
const wallPricing = 15;
const tabletopPricing = 8;
const yearlyPrice = 1550;

export default class ContactLogPricingStrategy implements IPricingStrategy {
    getPriceBreakdown() {
        return new Map([
            ["standing", 82],
            ["table", 8],
            ["wall", 15],
            ["software", 1550]
        ])
    }

    calculatePrice(parameters : IContactLogPricingParameters) : IContactLogPricingBreakdown {
        return new ContactLogPricingBreakdown(
            parameters.yearlyPrice,
            standingDisplayPricing * parameters.smallDisplays + 
                tabletopPricing * parameters.largeDisplays +
                wallPricing * parameters.wallDisplays
        );
    }
}