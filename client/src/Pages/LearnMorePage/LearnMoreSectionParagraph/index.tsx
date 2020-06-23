import React from "react";
import "./index.css";

export default class LearnMoreSectionParagraph extends React.Component {
    render() {
        return (
            <p className="learn-more-section-paragraph">{this.props.children}</p>
        )
    }
}