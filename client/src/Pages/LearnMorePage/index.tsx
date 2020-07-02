import React from "react";
import ILearnMorePageProps from "./ILearnMorePageProps";
import "./index.css"
import ProductDatabase from "./ProductDatabase";
import TopSection from "./TopSection";
import OverviewSection from "./OverviewSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import PurchaseButton from "./PurchaseButton";

export default class LearnMorePage extends React.Component<ILearnMorePageProps> {
    componentDidMount() {
        const productData = ProductDatabase.get(this.props.product)
        if (productData) {
            document.title = productData.name
        } else {
            document.title = "Learn More"
        }
    }

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
                    <PricingSection model={productData.pricingModel}/>
                    <PurchaseButton productName={productData.productName} />
                </div>
            )
        } else {
            return null;
        }
    }
}