import IFeature from "./IFeature";
import IOverview from "./IOverview";
import IPricingModel from "./PricingSection/Model/IPricingModel";
import ISection from "./ISection";

export default interface IProductData {
    overview: IOverview;
    features: IFeature[];
    sections: ISection[];
    name: string;
    productName: string;
    description: string;
    pricingModel: IPricingModel;
}