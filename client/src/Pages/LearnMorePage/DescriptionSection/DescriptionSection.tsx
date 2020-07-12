import React from "react";
import ISingleDescriptionSectionProps from "./ISingleDescriptionSectionProps";
import "./index.css";
import LearnMoreSubtitle from "../LearnMoreSubtitle";
import LearnMoreSectionParagraph from "../LearnMoreSectionParagraph";
import LearnMoreSection from "../LearnMoreSection";

export default class DescriptionSection extends React.Component<ISingleDescriptionSectionProps> {
    render() {
        return (
            <div className="description-section">
                <div className="description-section-wrapper">
                    {this.getContent()}
                </div>
            </div>
        )
    }

    getContent() {
        return this.props.left ?
            this.getLeftAlignedText() :
            this.getRightAlignedText();
    }

    getLeftAlignedText() {
        return (
            <>
                <div className="description-section-text-container">
                    <LearnMoreSubtitle>{this.props.section.title}</LearnMoreSubtitle>
                    <LearnMoreSectionParagraph>{this.props.section.description}</LearnMoreSectionParagraph>
                </div>
                <div className="description-section-image-container">
                    <img className="description-section-image" src={this.props.section.mediaURL} />
                </div>
            </>
        )
    }

    getRightAlignedText() {
        return (
            <>
                <div className="description-section-image-container">
                    <img className="description-section-image" src={this.props.section.mediaURL} />
                </div>
                <div className="description-section-text-container">
                    <LearnMoreSubtitle>{this.props.section.title}</LearnMoreSubtitle>
                    <LearnMoreSectionParagraph>{this.props.section.description}</LearnMoreSectionParagraph>
                </div>
            </>
        )
    }
}