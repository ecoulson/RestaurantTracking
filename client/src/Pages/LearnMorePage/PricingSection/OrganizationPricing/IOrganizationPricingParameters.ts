import IPricingParameter from "../Model/IPricingParameter";
import PricingModelType from "../Model/PricingModelType";

export default class OrganizationPricingParameters implements IPricingParameter {
    public type : PricingModelType;
    public users: number

    constructor(users: number) {
        this.type = PricingModelType.OrganizationRegistration;
        this.users = users
    }
}