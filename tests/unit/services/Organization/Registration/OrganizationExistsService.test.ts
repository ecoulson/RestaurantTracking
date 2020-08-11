import OrganizationExistsService from "../../../../../src/services/Organization/Registration/OrganizationExsitsService"
import OrganizationBroker from "../../../../../src/brokers/OrganizationBroker"
import { generateObjectId } from "../../../../helpers/mongo"
import OrganizationGenerator from "../../../../mocks/Generators/OrganizationGenerator"

const organization = new OrganizationGenerator();

describe("Organization Exists Service", () => {
    test("Organization does not exist", async () => {
        OrganizationBroker.prototype.findOrganizationById = 
            jest.fn().mockResolvedValue(null)
        const service = new OrganizationExistsService(new OrganizationBroker())
        
        const exists = await service.exists(generateObjectId());

        expect(exists).toBeFalsy()
    })

    test("Organization exist", async () => {
        OrganizationBroker.prototype.findOrganizationById = 
            jest.fn().mockResolvedValue(organization.generate())
        const service = new OrganizationExistsService(new OrganizationBroker())
        
        const exists = await service.exists(generateObjectId());

        expect(exists).toBeTruthy()
    })
})