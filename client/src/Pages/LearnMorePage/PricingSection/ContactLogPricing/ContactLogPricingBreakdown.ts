import IContactLogPricingBreakdown from "./IContactLogPricingBreakdown";
import PricingModelType from "../Model/PricingModelType";

export default class ContactLogPricingBreakdown implements IContactLogPricingBreakdown {
    public type: PricingModelType;
    public monthly: number;
    public setup: number;

    constructor(monthly: number, setup: number) {
        this.type = PricingModelType.ContactLog;
        this.monthly = monthly;
        this.setup = setup;
    }
}