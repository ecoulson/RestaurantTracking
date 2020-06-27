import React from "react";
import ILegalDocumentSectionProps from "./ILegalDocumentSectionProps";
import LegalSectionTitle from "../../../LegalSectionTitle";
import LegalDocumentText from "../LegalDocumentText";

export default class LegalDocumentSection extends React.Component<ILegalDocumentSectionProps> {
    render() {
        return (
            <div id={this.getId()} className="legal-document-section">
                <LegalSectionTitle >{this.props.section.title}</LegalSectionTitle>
                <LegalDocumentText text={this.props.section.text}/>
            </div>
        )
    }

    private getId() {
        return `section-${this.props.index + 1}`
    }
}