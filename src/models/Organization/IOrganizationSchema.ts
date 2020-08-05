import IDocument from "../IDocument";
import IAddress from "./IAddress";

export default interface IOrganizationSchema extends IDocument {
    organizationId: string;
    organizationName: string;
    permissionSets: string[];
    buildings: string[];
    apps: string[];
    stripeId: string;
    address: IAddress
}