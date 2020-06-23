import IFeature from "./IFeature";
import IOverview from "./IOverview";
import IPricingModel from "./PricingSection/Model/IPricingModel";

export default interface IProductData {
    overview: IOverview;
    features: IFeature[];
    name: string;
    productName: string;
    description: string;
    pricingModel: IPricingModel;
}