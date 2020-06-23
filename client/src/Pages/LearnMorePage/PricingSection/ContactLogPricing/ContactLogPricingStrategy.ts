import IPricingStrategy from "../Model/IPricingStrategy";
import IContactLogPricingParameters from "./IContactLogPricingParameters";
import IPricingBreakdown from "../Model/IPricingBreakdown";
import ContactLogPricingBreakdown from "./ContactLogPricingBreakdown";
import IContactLogPricingBreakdown from "./IContactLogPricingBreakdown";

const smallPricing = 4.99;
const wallPricing = 7.99;
const largePricing = 8.99;
const setupPrice = 5;
const monthlyPrice = 15;

export default class ContactLogPricingStrategy implements IPricingStrategy {
    calculatePrice(parameters : IContactLogPricingParameters) : IContactLogPricingBreakdown {
        return new ContactLogPricingBreakdown(
            monthlyPrice,
            smallPricing * parameters.smallDisplays + 
                largePricing * parameters.largeDisplays +
                wallPricing * parameters.wallDisplays +
                setupPrice
        );
    }
}