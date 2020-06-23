import IPricingBreakdown from "../Model/IPricingBreakdown";

export default interface IContactLogPricingBreakdown extends IPricingBreakdown {
    monthly: number;
    setup: number;
}