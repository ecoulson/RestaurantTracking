import IDocument from "../IDocument";

export default interface IAppSchema extends IDocument {
    organizationId: string;
    type: string;
}