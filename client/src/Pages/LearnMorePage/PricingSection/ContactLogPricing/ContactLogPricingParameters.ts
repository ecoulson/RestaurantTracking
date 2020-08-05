import IContactLogPricingParameters from "./IContactLogPricingParameters";
import PricingModelType from "../Model/PricingModelType";

export default class ContactLogPricingParameters implements IContactLogPricingParameters {
    public type: PricingModelType;
    public wallDisplays: number;
    public largeDisplays: number;
    public smallDisplays: number;
    public yearlyPrice: number;

    constructor(smallDisplays : number, largeDisplays : number, wallDisplays : number, yearlyPrice: number) {
        this.type = PricingModelType.ContactLog;
        this.wallDisplays = wallDisplays;
        this.largeDisplays = largeDisplays;
        this.smallDisplays = smallDisplays;
        this.yearlyPrice = yearlyPrice;
    }
}