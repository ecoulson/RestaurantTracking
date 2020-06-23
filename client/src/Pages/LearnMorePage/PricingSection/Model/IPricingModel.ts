import PricingModelType from "./PricingModelType";
import IPricingStrategy from "./IPricingStrategy";

export default interface IPricingModel {
    type: PricingModelType;
    description: string;
    pricingStrategy : IPricingStrategy;
}