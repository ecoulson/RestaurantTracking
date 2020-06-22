import React from "react";
import ILearnMorePageProps from "./ILearnMorePageProps";
import "./index.css"
import ProductDatabase from "./ProductDatabase";
import TopSection from "./TopSection";
import OverviewSection from "./OverviewSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";

export default class LearnMorePage extends React.Component<ILearnMorePageProps> {
    render() {
        const productData = ProductDatabase.get(this.props.product)
        if (productData) {
            return (
                <div className="learn-more-section-container">
                    <TopSection 
                        name={productData.name} 
                        description={productData.description} />
                    <OverviewSection overview={productData.overview} />
                    <FeatureSection features={productData.features} />
                    <PricingSection model={productData.pricingModel}/>
                </div>
            )
        } else {
            return null;
        }
    }
}