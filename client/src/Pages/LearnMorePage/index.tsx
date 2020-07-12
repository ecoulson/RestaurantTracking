import React from "react";
import ILearnMorePageProps from "./ILearnMorePageProps";
import "./index.css"
import ProductDatabase from "./ProductDatabase";
import TopSection from "./TopSection";
import OverviewSection from "./OverviewSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import PurchaseButton from "./PurchaseButton";
import DescriptionSections from "./DescriptionSection";

export default class LearnMorePage extends React.Component<ILearnMorePageProps> {
    render() {
        const productData = ProductDatabase.get(this.props.product)
        if (productData) {
            return (
                <div className="learn-more-section-container">
                    <TopSection 
                        name={productData.name} 
                        description={productData.description} 
                        productName={productData.productName} />
                    <OverviewSection overview={productData.overview} />
                    <FeatureSection features={productData.features} />
                    <DescriptionSections sections={productData.sections} />
                    <PricingSection model={productData.pricingModel}/>
                    {/* <PurchaseButton productName={productData.productName} /> */}
                </div>
            )
        } else {
            return null;
        }
    }
}