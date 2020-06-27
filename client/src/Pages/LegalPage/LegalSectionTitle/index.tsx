import React from "react";
import "./index.css";
import ILegalSectionTitleProps from "./ILegalSectionTitleProps";

export default class LegalSectionTitle extends React.Component {
    render() {
        return (
            <h1 className="legal-section-title">{this.props.children}</h1>
        )
    }
}