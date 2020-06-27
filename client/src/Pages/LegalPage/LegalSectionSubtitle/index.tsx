import React from "react";
import "./index.css";

export default class LegalSectionSubtitle extends React.Component {
    render() {
        return (
            <h2 className="legal-section-subtitle">{this.props.children}</h2>
        )
    }
}