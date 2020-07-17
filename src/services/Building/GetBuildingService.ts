import IGetBuildingService from "./IGetBuildingService";
import BuildingBroker from "../../brokers/BuildingBroker";

export default class GetBuildingService implements IGetBuildingService {
    private buildingBroker : BuildingBroker;

    constructor(buildingBroker : BuildingBroker) {
        this.buildingBroker = buildingBroker;
    }

    async getBuildings(organizationId: string) {
        return await this.buildingBroker.getBuildings(organizationId);
    }
}