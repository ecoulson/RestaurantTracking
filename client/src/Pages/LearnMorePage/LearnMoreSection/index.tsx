import React from "react";
import ILearnMoreSectionProps from "./ILearnMoreSectionProps";
import "./index.css"

export default class LearnMoreSection extends React.Component<ILearnMoreSectionProps> {
    render() {
        return (
            <div className="learn-more-section" id={`learn-more-section-${this.props.id}`}>
                <div className="learn-more-section-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}