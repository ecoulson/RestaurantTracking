import CreateBuildingService from "../../../../src/services/Building/CreateBuildingService";
import BuildingBroker from "../../../../src/brokers/BuildingBroker";
import BuildingGenerator from "../../../mocks/Generators/BuildingGenerator";
import BuildingType from "../../../../src/models/Building/BuildingType";
import faker from "faker";
import OrganizationGenerator from "../../../mocks/Generators/OrganizationGenerator";
import OrganizationBroker from "../../../../src/brokers/OrganizationBroker";

const buildingGenerator = new BuildingGenerator();
const organizationGenerator = new OrganizationGenerator();

describe("Create Building Service Suite", () => {
    test("Organization does not exist", async () => {
        const name = faker.name.lastName();
        const organization = organizationGenerator.generate()
        const type = faker.random.arrayElement([
            BuildingType.Academic, 
            BuildingType.Residential
        ])
        const buildingToCreate = buildingGenerator
            .setName(name)
            .setOrganizationId(organization.organizationId)
            .setType(type)
            .generate();
        BuildingBroker.prototype.create = 
            jest.fn().mockResolvedValue(buildingToCreate)
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(null);
        OrganizationBroker.prototype.save = jest.fn()
        const service = new CreateBuildingService(
            new BuildingBroker(),
            new OrganizationBroker()
        );

        try {
            await service.create(
                name,
                organization.organizationId, 
                type
            )
        } catch (error) {
            expect(error).toEqual(new Error(
                `No organization with id: ${organization.organizationId}`
            ))
        }

        expect.assertions(1)
    })

    test("Create a building", async () => {
        const name = faker.name.firstName();
        const organization = organizationGenerator.generate();
        const organizationId = faker.name.firstName();
        const type = faker.random.arrayElement([BuildingType.Academic, BuildingType.Residential])
        const buildingToCreate = buildingGenerator
            .setName(name)
            .setOrganizationId(organizationId)
            .setType(type)
            .generate();
        BuildingBroker.prototype.create = 
            jest.fn().mockResolvedValue(buildingToCreate)
        OrganizationBroker.prototype.findOrganizationById =
            jest.fn().mockResolvedValue(organization);
        OrganizationBroker.prototype.save = jest.fn()
        const service = new CreateBuildingService(
            new BuildingBroker(),
            new OrganizationBroker()
        );

        const building = await service.create(
            name,
            organizationId, 
            type
        )

        expect(building).toEqual(buildingToCreate)
        expect(organization.buildings).toContain(name)
    });
})