import IPricingParameter from "./IPricingParameter";

export default interface IPricingStrategy {
    calculatePrice(pricingArgs? : IPricingParameter) : number;
}