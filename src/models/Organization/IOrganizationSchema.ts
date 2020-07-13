import IDocument from "../IDocument";

export default interface IOrganizationSchema extends IDocument {
    organizationId: string;
    organizationName: string;
}