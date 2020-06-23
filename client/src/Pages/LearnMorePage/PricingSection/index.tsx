import React from "react";
import LearnMoreSection from "../LearnMoreSection";
import LearnMoreSectionTitle from "../LearnMoreSectionTitle";
import PricingModelType from "./Model/PricingModelType";
import RestaurantPricing from "./RestaurantPricing";
import IPricingModelProps from "./IPricingModelProps";
import ContactLogPricing from "./ContactLogPricing";
import "./index.css";

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
            case PricingModelType.ContactLog:
                return <ContactLogPricing {...this.props.model} />
            default:
                return null;
        }
    }
}