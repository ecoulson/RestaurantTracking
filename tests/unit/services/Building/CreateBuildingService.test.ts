import CreateBuildingService from "../../../../src/services/Building/CreateBuildingService";
import BuildingBroker from "../../../../src/brokers/BuildingBroker";
import BuildingGenerator from "../../../mocks/Generators/BuildingGenerator";
import BuildingType from "../../../../src/models/Building/BuildingType";
import faker from "faker";

const buildingGenerator = new BuildingGenerator();

describe("Create Building Service Suite", () => {
    test("Create a building", async () => {
        const name = faker.name.firstName();
        const organizationId = faker.name.firstName();
        const type = faker.random.arrayElement([BuildingType.Academic, BuildingType.Residential])
        const buildingToCreate = buildingGenerator
            .setName(name)
            .setOrganizationId(organizationId)
            .setType(type)
            .generate();
        BuildingBroker.prototype.create = 
            jest.fn().mockResolvedValue(buildingToCreate)
        const service = new CreateBuildingService(new BuildingBroker());

        const building = await service.create(
            name,
            organizationId, 
            type
        )

        expect(building).toEqual(buildingToCreate)
    });
})