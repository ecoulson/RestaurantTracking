import React from "react";
import ILegalDocumentTableOfContentsProps from "./ILegalDocumentTableOfContentsProps";
import ILegalDocumentTableOfContentsState from "./ILegalDocumentTableOfContentsState";
import LegalDocumentTableOfContentsItem from "./LegalDocumentTableOfContentsItem";
import "./index.css";

export default class LegalDocumentTableOfContents extends React.Component<ILegalDocumentTableOfContentsProps, ILegalDocumentTableOfContentsState> {
    constructor(props : ILegalDocumentTableOfContentsProps) {
        super(props)
        this.state = {
            isFixed: false
        }
    }

    componentDidMount() {
        const container = document.getElementsByClassName("basic-layout-page")[0];
        container.addEventListener("scroll", (event : Event) => {
            if (((event.target as HTMLElement).scrollTop) > 427) {
                this.setState({
                    isFixed: true
                })
            } else {
                this.setState({
                    isFixed: false
                })
            }
        })
    }

    render() {
        return (
            <div className="legal-document-table-of-contents">
                <div className={this.getFixedClass()}>
                {
                    this.props.document.sections.map((section, i) => {
                        return <LegalDocumentTableOfContentsItem 
                                    id={this.props.document.id}
                                    index={i + 1} 
                                    key={i} 
                                    name={section.title} />
                    })
                }
                </div>
            </div>
        )
    }

    getFixedClass() {
        return this.state.isFixed ? "legal-document-table-of-contents-fixed" : ""
    }
}