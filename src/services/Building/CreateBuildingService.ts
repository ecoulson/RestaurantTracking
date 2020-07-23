import ICreateBuildingService from "./ICreateBuildingService";
import BuildingType from "../../models/Building/BuildingType";
import BuildingBroker from "../../brokers/BuildingBroker";

export default class CreateBuildingService implements ICreateBuildingService {
    private buildingBroker : BuildingBroker;

    constructor(buildingBroker : BuildingBroker) {
        this.buildingBroker = buildingBroker;
    }

    async create(name: string, organizationId: string, type: BuildingType) {
        return await this.buildingBroker.create(
            name,
            organizationId,
            type
        )
    }
}