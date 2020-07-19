import IBuilding from "../../models/Building/IBuilding";

export default interface IGetBuildingService {
    getBuildings(organizationId: string) : Promise<IBuilding[]>;
}