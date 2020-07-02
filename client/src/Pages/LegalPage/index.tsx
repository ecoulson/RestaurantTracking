import React from "react";
import BasicLayout from "../../Layouts/BasicLayout";
import ILegalPageProps from "./ILegalPageProps";
import LegalDocumentDatabase from "./database/LegalDocumentDatabase";
import ILegalDocument from "./database/ILegalDocument";
import LegalSectionTitle from "./LegalSectionTitle";
import LegalSectionSubtitle from "./LegalSectionSubtitle";
import moment from "moment"
import LegalMission from "./LegalMission";
import LegalDocumentDisplay from "./LegalDocumentDisplay";

export default class LegalPage extends React.Component<ILegalPageProps> {
    componentDidMount() {
        const legalDocument = LegalDocumentDatabase.get(this.props.match.params.documentName)
        if (legalDocument) {
            document.title = legalDocument.documentName
        } else {
            document.title = "Legal Document"
        }
    }

    componentDidUpdate() {
        const legalDocument = LegalDocumentDatabase.get(this.props.match.params.documentName)
        if (legalDocument) {
            document.title = legalDocument.documentName
        } else {
            document.title = "Legal Document"
        }
    }

    render() {
        if (LegalDocumentDatabase.has(this.props.match.params.documentName)) {
            return this.renderDocument()
        } else {
            return this.renderEmpty();
        }
    }

    private renderDocument() {
        const document : ILegalDocument = LegalDocumentDatabase.get(
            this.props.match.params.documentName
        ) as ILegalDocument;
        return (
            <BasicLayout title={document.documentName}>
                <LegalSectionTitle>{document.documentName}</LegalSectionTitle>
                <LegalSectionSubtitle>
                    Last updated {moment(document.lastUpdated.toISOString(), moment.ISO_8601).format("MMM Do, YYYY")}
                </LegalSectionSubtitle>
                {this.renderMission(document)}
                <hr></hr>
                <LegalDocumentDisplay document={document} />
            </BasicLayout>
        )
    }

    private renderMission(document : ILegalDocument) {
        if (document.goal) {
            return <LegalMission>{document.goal}</LegalMission>
        }
        return null;
    }

    private renderEmpty() {
        return (
            <BasicLayout title="Document Not Found">
                <p>Could not find the document you were looking for</p>
            </BasicLayout>
        )
    }
}