import IPricingParameter from "../Model/IPricingParameter";

export default class RestaurantPricingParameters implements IPricingParameter {
    public users: number

    constructor(users: number) {
        this.users = users
    }
}