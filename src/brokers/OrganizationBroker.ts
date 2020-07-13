import IOrganization from "../models/Organization/IOrganization";
import OrganizationModel from "../models/Organization/OrganizationModel";

export default class OrganizationBroker {
    async findOrganizationById(organizationId: string) : Promise<IOrganization> {
        try {
            return await OrganizationModel.findByOrganizationId(organizationId);
        } catch (error) {
            throw error;
        }
    }
}