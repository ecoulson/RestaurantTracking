import React from "react";
import LearnMoreSectionTitle from "../LearnMoreSectionTitle";
import LearnMoreSection from "../LearnMoreSection";
import LearnMoreSectionParagraph from "../LearnMoreSectionParagraph";
import IOverviewProps from "./IOverviewProps";
import OverviewAboutContainer from "./OverviewAboutContainer";
import OverviewMedia from "./OverviewMedia";

export default class OverviewSection extends React.Component<IOverviewProps> {
    render() {
        return (
            <LearnMoreSection id="overview">
                <LearnMoreSectionTitle>{this.props.overview.title}</LearnMoreSectionTitle>
                <OverviewAboutContainer>
                    <LearnMoreSectionParagraph>{this.props.overview.about}</LearnMoreSectionParagraph>
                    <OverviewMedia mediaLink={this.props.overview.mediaPath} />
                </OverviewAboutContainer>
            </LearnMoreSection>
        );
    }
}