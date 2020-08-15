import GetBuildingService from "../../../../src/services/Building/GetBuildingService"
import BuildingBroker from "../../../../src/brokers/BuildingBroker";
import BuildingGenerator from "../../../mocks/Generators/BuildingGenerator";

const buildingGenerator = new BuildingGenerator();

describe("Get Building Service Suite", () => {
    test("Get buildings", async() => {
        const building = buildingGenerator.generate()
        BuildingBroker.prototype.getBuildings =
            jest.fn().mockResolvedValue([building])
        const service = new GetBuildingService(new BuildingBroker());

        const buildings = await service.getBuildings("foo");
        
        expect(buildings).toHaveLength(1);
        expect(buildings[0]).toEqual(building);
    })
})