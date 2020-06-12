import IDocument from "../IDocument";

export default interface IPermissionSetSchema extends IDocument {
    name: string;
    dateCreated: Date;
    dateModified: Date;
}