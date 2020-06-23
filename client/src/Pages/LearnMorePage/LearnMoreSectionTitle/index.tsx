import React from "react";
import "./index.css";

export default class LearnMoreSectionTitle extends React.Component {
    render() {
        return (
            <h1 className="learn-more-section-title">{this.props.children}</h1>
        )
    }
}