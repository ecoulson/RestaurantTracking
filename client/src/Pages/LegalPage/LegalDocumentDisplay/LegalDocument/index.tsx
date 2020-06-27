import React from "react";
import ILegalDocumentProps from "./ILegalDocumentProps";
import "./index.css"; 
import LegalDocumentSection from "./LegalDocumentSection";
import LegalDocumentText from "./LegalDocumentText";

export default class LegalDocument extends React.Component<ILegalDocumentProps> {
    render() {
        return (
            <div className="legal-document">
                {this.getDocumentSummary()}
                {
                    this.props.document.sections.map((section, i) => {
                        return <LegalDocumentSection key={i} index={i} section={section} />
                    })
                }
            </div>
        )
    }

    getDocumentSummary() {
        return this.props.document.summary ?
            <LegalDocumentText text={this.props.document.summary} /> : 
            null;
    }
}