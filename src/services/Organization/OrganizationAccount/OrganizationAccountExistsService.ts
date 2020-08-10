import IOrganizationAccountExistsService from "./IOrganizationAccountExistsService";
import OrganizationBroker from "../../../brokers/OrganizationBroker";

export default class OrganizationAccountExistsService implements IOrganizationAccountExistsService {
    private organizationBroker : OrganizationBroker

    constructor(organizationBroker : OrganizationBroker) {
        this.organizationBroker = organizationBroker;
    }

    async hasAccount(organizationId: string, email: string) {
        return (await this.organizationBroker
            .findUser(organizationId, email)) !== null
    }

    async isVerified(organizationId: string, email: string) {
        const user = await this.organizationBroker.findUser(organizationId, email)
        return user && user.verified;
    }

}