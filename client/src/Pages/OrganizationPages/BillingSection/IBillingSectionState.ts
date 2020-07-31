import IOrganization from "../../../API/GetOrganizationRequest/IOrganization";

export default interface IBillingSectionState {
    organization: IOrganization | null;
}