import IGetOrganizationService from "./IGetOrganizationService";
import OrganizationBroker from "../../brokers/OrganizationBroker";

export default class GetOrganizationService implements IGetOrganizationService {
    private organizationBroker : OrganizationBroker;

    constructor(organizationBroker: OrganizationBroker) {
        this.organizationBroker = organizationBroker;
    }

    async getOrganization(organizationId: string) {
        const organization = 
            await this.organizationBroker.findOrganizationById(organizationId);
        if (!organization) {
            throw new Error(`No organization with id: ${organizationId}`);
        }
        return organization;
    }
}