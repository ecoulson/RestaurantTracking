import ILegalDocumentSection from "./ILegalDocumentSection";

export default interface ILegalDocument {
    id: string;
    documentName: string;
    lastUpdated: Date;
    goal?: string;
    sections: ILegalDocumentSection[]
    summary?: string;
}