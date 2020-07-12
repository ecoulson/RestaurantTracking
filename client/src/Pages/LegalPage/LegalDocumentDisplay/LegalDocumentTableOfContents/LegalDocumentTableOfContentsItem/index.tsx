import React, { KeyboardEvent } from "react";
import ILegalDocumentTableOfContentsItemProps from "./ILegalDocumentTableOfContentsItemProps";

import "./index.css";

export default class LegalDocumentTableOfContentsItem extends React.Component<ILegalDocumentTableOfContentsItemProps> {
    constructor(props : ILegalDocumentTableOfContentsItemProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    render() {
        return (
            <div
                className="legal-document-table-of-contents-item"
                onClick={this.onClick}>
                <span className="legal-document-table-of-contents-index">
                    {this.props.index}.
                </span> 
                <button 
                    onKeyPress={this.onKeyPress} 
                    tabIndex={0} 
                    className="legal-document-table-of-contents-link">
                    {this.props.name}
                </button>
            </div>
        )
    }

    private onKeyPress(event : KeyboardEvent) {
        event.preventDefault();
        if (event.key === "Enter") {
            this.onClick();
        }
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