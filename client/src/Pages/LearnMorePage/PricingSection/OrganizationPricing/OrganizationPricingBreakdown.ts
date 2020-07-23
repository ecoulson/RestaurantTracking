import IOrganizationPricingBreakdown from "./IOrganizationPricingBreakdown";
import PricingModelType from "../Model/PricingModelType";

export default class OrganizationPricingBreakdown implements IOrganizationPricingBreakdown {
    public type: PricingModelType;
    public monthly: number;

    constructor(monthly : number) {
        this.type = PricingModelType.OrganizationRegistration;
        this.monthly = monthly;
    }
}