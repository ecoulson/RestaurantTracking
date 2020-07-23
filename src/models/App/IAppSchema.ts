import IDocument from "../IDocument";
import AppType from "./AppType";

export default interface IAppSchema extends IDocument {
    organizationId: string;
    type: AppType;
}