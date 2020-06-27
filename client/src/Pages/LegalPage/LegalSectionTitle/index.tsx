import React from "react";
import "./index.css";

export default class LegalSectionTitle extends React.Component {
    render() {
        return (
            <h1 className="legal-section-title">{this.props.children}</h1>
        )
    }
}