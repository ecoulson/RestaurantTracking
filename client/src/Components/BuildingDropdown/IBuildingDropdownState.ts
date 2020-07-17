import IBuilding from "../../API/GetBuildingsRequest/IBuilding";
import BuildingType from "./BuildingType";

export default interface IBuildingDropdownState {
    buildings: IBuilding[],
}