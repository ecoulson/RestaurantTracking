import React from "react";
import LearnMoreSection from "../LearnMoreSection";
import LearnMoreSectionTitle from "../LearnMoreSectionTitle";
import IFeatureSectionProps from "./IFeatureSectionProps";
import FeatureSectionContainer from "./FeatureSectionContainer";
import FeatureItem from "./FeatureItem";

export default class FeatureSection extends React.Component<IFeatureSectionProps> {
    render() {
        return (
            <LearnMoreSection id="features">
                <LearnMoreSectionTitle>Features</LearnMoreSectionTitle>
                <FeatureSectionContainer>
                    {
                        this.props.features.map((feature) => {
                            return <FeatureItem feature={feature} />
                        })
                    }
                </FeatureSectionContainer>
            </LearnMoreSection>
        )
    }
}