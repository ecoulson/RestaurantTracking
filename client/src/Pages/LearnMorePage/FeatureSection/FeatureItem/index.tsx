import React from "react";
import IFeatureItemProps from "./IFeatureItemProps";
import LearnMoreSectionParagraph from "../../LearnMoreSectionParagraph";
import Icon from "../../../../Components/Icon";
import "./index.css";
import LearnMoreSubtitle from "../../LearnMoreSubtitle";
import IconFillSet from "../../../../Components/Icon/IconFillSet";

export default class FeatureItem extends React.Component<IFeatureItemProps> {
    render() {
        return (
            <div className={`feature-item ${this.getFillType()}`}>
                <Icon color="#AAAAAA" icon={this.props.feature.icon} />
                <LearnMoreSubtitle>{this.props.feature.name}</LearnMoreSubtitle>
                <LearnMoreSectionParagraph>{this.props.feature.description}</LearnMoreSectionParagraph>
            </div>
        )
    }

    private getFillType() {
        return IconFillSet.has(this.props.feature.icon) ?
            "feature-item-fill" :
            "feature-item-stroke";
    }
}