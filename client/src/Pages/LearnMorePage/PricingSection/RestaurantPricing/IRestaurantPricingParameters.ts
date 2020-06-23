import IPricingParameter from "../Model/IPricingParameter";
import PricingModelType from "../Model/PricingModelType";

export default class RestaurantPricingParameters implements IPricingParameter {
    public type : PricingModelType;
    public users: number

    constructor(users: number) {
        this.type = PricingModelType.RestaurantRegistration;
        this.users = users
    }
}