import IGenerator from "./IGenerator";
import IBuilding from "../../../src/models/Building/IBuilding";
import BuildingModel from "../../../src/models/Building/BuildingModel";
import faker from "faker";
import BuildingType from "../../../src/models/Building/BuildingType";

export default class BuildingGenerator implements IGenerator<IBuilding> {
    private name: string;
    private organizationId: string;
    private type: BuildingType;

    constructor() {
        this.name = faker.name.firstName()
        this.organizationId = faker.name.firstName()
        this.type = BuildingType.Academic
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setOrganizationId(organizationId: string) {
        this.organizationId = organizationId;
        return this;
    }

    setType(buildingType : BuildingType) {
        this.type = buildingType;
        return this;
    }

    generate() {
        const building = new BuildingModel({
            organizationId: this.organizationId,
            type: this.type,
            name: this.name
        })

        return building;
    }

    reset() {
        this.name = faker.name.firstName();
        this.organizationId = faker.name.firstName();
        this.type = BuildingType.Academic
    }
}