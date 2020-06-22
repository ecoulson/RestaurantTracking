import React from "react";
import LearnMoreSection from "../LearnMoreSection";
import LearnMoreSectionTitle from "../LearnMoreSectionTitle";
import PricingModelType from "./Model/PricingModelType";
import RestaurantPricing from "./RestaurantPricing";
import IPricingModel from "./Model/IPricingModel";
import IPricingModelProps from "./IPricingModelProps";

export default class PricingSection extends React.Component<IPricingModelProps> {
    render() {
        return (
            <LearnMoreSection id="pricing">
                <LearnMoreSectionTitle>Pricing</LearnMoreSectionTitle>
                {this.getPricingComponent()}
            </LearnMoreSection>
        )
    }

    private getPricingComponent() {
        switch (this.props.model.type) {
            case PricingModelType.RestaurantRegistration:
                return <RestaurantPricing {...this.props.model} />
            default:
                return null;
        }
    }
}