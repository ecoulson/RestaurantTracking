import IPricingParameter from "../Model/IPricingParameter";

export default interface IContactLogPricingParameters extends IPricingParameter {
    smallDisplays: number;
    largeDisplays: number;
    wallDisplays: number;
}