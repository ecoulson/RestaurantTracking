import React from "react";
import "./index.css";

export default class LearnMoreSubtitle extends React.Component {
    render() {
        return (
            <h2 className="learn-more-subtitle">{this.props.children}</h2>
        )
    }
}