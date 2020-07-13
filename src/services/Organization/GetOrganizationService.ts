import IGetOrganizationService from "./IGetOrganizationService";
import OrganizationBroker from "../../brokers/OrganizationBroker";

export default class GetOrganizationService implements IGetOrganizationService {
    private organizationBroker : OrganizationBroker;

    constructor() {
        this.organizationBroker = new OrganizationBroker();
    }

    async getOrganization(organizationId: string) {
        return await this.organizationBroker.findOrganizationById(organizationId);
    }
}