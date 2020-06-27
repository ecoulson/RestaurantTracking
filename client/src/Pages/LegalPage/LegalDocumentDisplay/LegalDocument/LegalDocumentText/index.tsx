import React from "react";
import "./index.css";
import ReactMarkdown from "react-markdown";
import ILegalDocumentTextProps from "./IlegalDocumentTextProps";

export default class LegalDocumentText extends React.Component<ILegalDocumentTextProps> {
    render() {
        return (
            <ReactMarkdown className="legal-document-text" source={this.props.text} />
        )
    }
}