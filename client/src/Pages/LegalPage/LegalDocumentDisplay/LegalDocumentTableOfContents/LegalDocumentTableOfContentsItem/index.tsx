import React from "react";
import ILegalDocumentTableOfContentsItemProps from "./ILegalDocumentTableOfContentsItemProps";

import "./index.css";

export default class LegalDocumentTableOfContentsItem extends React.Component<ILegalDocumentTableOfContentsItemProps> {
    constructor(props : ILegalDocumentTableOfContentsItemProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div
                className="legal-document-table-of-contents-item"
                onClick={this.onClick}>
                <span className="legal-document-table-of-contents-index">
                    {this.props.index}.
                </span> 
                <a className="legal-document-table-of-contents-link">
                    {this.props.name}
                </a>
            </div>
        )
    }

    private onClick() {
        const element = document.getElementById(this.getId());
        if (element) {
            const container = document.getElementsByClassName("basic-layout-page")[0];
            if (container) {
                container.scrollTo({
                    top: element.offsetTop,
                    left: 0,
                    behavior: "smooth"
                })
            }
        }
    }

    private getId() {
        return `section-${this.props.index}`;
    }
}