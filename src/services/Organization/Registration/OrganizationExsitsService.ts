import IOrganizationExistsService from "./IOrganizationExistsService";
import OrganizationBroker from "../../../brokers/OrganizationBroker";

export default class OrganizationExistsService implements IOrganizationExistsService {
    private broker : OrganizationBroker;

    constructor(broker : OrganizationBroker) {
        this.broker = broker;
    }

    async exists(organizationId: string) {
        return await this.broker.findOrganizationById(organizationId) !== null;
    }
}