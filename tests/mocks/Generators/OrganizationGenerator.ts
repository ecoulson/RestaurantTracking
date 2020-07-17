import IGenerator from "./IGenerator";
import faker from "faker";
import IOrganization from "../../../src/models/Organization/IOrganization";
import OrganizationModel from "../../../src/models/Organization/OrganizationModel";

export default class OrganizationGenerator implements IGenerator<IOrganization> {
    generate() {
        return new OrganizationModel({
            organizationId: faker.name.firstName(),
            organizationName: faker.company.companyName()
        });
    }
}