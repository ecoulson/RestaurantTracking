import IOrganization from "../../../models/Organization/IOrganization";

export default interface IRegisterOrganizationService {
    registerOrganization(organizationId: string, organizationName: string) : Promise<IOrganization>;
}