import React from "react";
import LearnMoreSection from "../LearnMoreSection";
import LearnMoreSectionParagraph from "../LearnMoreSectionParagraph";
import LearnMoreSectionTitle from "../LearnMoreSectionTitle";
import ITopSectionProps from "./ITopSectionProps";
import PurchaseButton from "../PurchaseButton";

export default class TopSection extends React.Component<ITopSectionProps> {
    render() {
        return (
            <LearnMoreSection id="top">
                <LearnMoreSectionTitle>{this.props.name}</LearnMoreSectionTitle>
                <LearnMoreSectionParagraph>{this.props.description}</LearnMoreSectionParagraph>
                <PurchaseButton productName={this.props.productName} />
            </LearnMoreSection>
        )
    }
}