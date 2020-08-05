import IRequestProps from "../IRequestProps";
import IOrganization from "./IOrganization";

export default interface IGetOrganizationRequest extends IRequestProps<IOrganization> {
    organizationId: string;
}