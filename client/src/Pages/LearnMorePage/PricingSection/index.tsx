import React from "react";
import LearnMoreSection from "../LearnMoreSection";
import LearnMoreSectionTitle from "../LearnMoreSectionTitle";
import IPricingModelProps from "./IPricingModelProps";
import "./index.css";
import Button from "../../../Components/Button";
import AppHistory from "../../../AppHistory";
import LearnMoreSectionParagraph from "../LearnMoreSectionParagraph";

export default class PricingSection extends React.Component<IPricingModelProps> {
    constructor(props : IPricingModelProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <LearnMoreSection id="pricing">
                <LearnMoreSectionTitle>Price Estimator</LearnMoreSectionTitle>
                <LearnMoreSectionParagraph>{this.props.model.description}</LearnMoreSectionParagraph>
                <Button onClick={this.handleClick}>Go To Estimator</Button>
            </LearnMoreSection>
        )
    }

    private handleClick() {
        AppHistory.push(`/learn-more/${this.props.product}/price-estimator`)
    }
}