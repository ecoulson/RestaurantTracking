import React from "react";
import "./index.css";
import ILegalDocumentDisplayProps from "./ILegalDocumentDisplayProps";
import LegalDocumentTableOfContents from "./LegalDocumentTableOfContents";
import LegalDocument from "./LegalDocument";

export default class LegalDocumentDisplay extends React.Component<ILegalDocumentDisplayProps> {
    render() {
        return (
            <div className="legal-document-container">
                <LegalDocumentTableOfContents document={this.props.document} />
                <LegalDocument document={this.props.document} />
            </div>
        )
    }
}