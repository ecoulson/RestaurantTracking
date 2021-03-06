import ICreateCustomerService from "./ICreateCustomerService";
import StripeBroker from "../../../brokers/StripeBroker";
import OrganizationBroker from "../../../brokers/OrganizationBroker";

export default class CreateCustomerService implements ICreateCustomerService {
    private stripeBroker : StripeBroker;
    private organizationBroker : OrganizationBroker;

    constructor(stripeBroker : StripeBroker, organizationBroker : OrganizationBroker) {
        this.stripeBroker = stripeBroker;
        this.organizationBroker = organizationBroker;
    }

    async createCustomer(email: string, organizationId : string) {
        const organization = await this.organizationBroker.findOrganizationById(organizationId);
        if (!organization) {
            throw new Error(`No organization with id: ${organizationId}`)
        }
        const customer = await this.stripeBroker.createCustomer(email, organization.organizationName);
        organization.stripeId = customer.id;
        return await this.organizationBroker.save(organization);
    }
}