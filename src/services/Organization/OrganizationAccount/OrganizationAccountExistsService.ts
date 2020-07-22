import IOrganizationAccountExistsService from "./IOrganizationAccountExistsService";
import OrganizationBroker from "../../../brokers/OrganizationBroker";

export default class OrganizationAccountExistsService implements IOrganizationAccountExistsService {
    private organizationBroker : OrganizationBroker

    constructor(organizationBroker : OrganizationBroker) {
        this.organizationBroker = organizationBroker;
    }

    async hasAccount(organizationId: string, email: string) {
        const users = await this.organizationBroker.findUser(organizationId, email)
        return users.length === 1;
    }

    async isVerified(organizationId: string, email: string) {
        const users = await this.organizationBroker.findUser(organizationId, email)
        return users.length === 1 && users[0].verified;
    }

}