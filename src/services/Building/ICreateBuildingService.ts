import BuildingType from "../../models/Building/BuildingType";
import IBuilding from "../../models/Building/IBuilding";

export default interface ICreateBuildingService {
    create(name: string, organizationId : string, type : BuildingType) : Promise<IBuilding>;
}