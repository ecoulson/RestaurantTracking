import IOrganization from "../../models/Organization/IOrganization";

export default interface IGetOrganizationService {
    getOrganization(organizationId: string) : Promise<IOrganization>;
}