import OrganizationBroker from "../../../../src/brokers/OrganizationBroker"
import GetOrganizationService from "../../../../src/services/Organization/GetOrganizationService";
import faker from "faker"
import OrganizationGenerator from "../../../mocks/Generators/OrganizationGenerator";

const organizationGenerator = new OrganizationGenerator();

describe("Get Organization Service Suite", () => {
    test("No organization with id", async() => {
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(null);
        const service = new GetOrganizationService(new OrganizationBroker())
        const id = faker.name.firstName();

        try {
            await service.getOrganization(id)
        } catch (error) {
            expect(error).toEqual(new Error(`No organization with id: ${id}`))
        }

        expect.assertions(1);
    })

    test("Organization", async() => {
        const organization = organizationGenerator.generate();
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(organization);
        const service = new GetOrganizationService(new OrganizationBroker())

        const resultingOrganization = 
            await service.getOrganization(organization.organizationId)

        expect(resultingOrganization).toEqual(organization);
    })
})