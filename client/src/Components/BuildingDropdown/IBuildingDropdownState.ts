import IBuilding from "../../API/GetBuildingsRequest/IBuilding";

export default interface IBuildingDropdownState {
    buildings: IBuilding[],
    filteredBuildings: IBuilding[],
    value: string
}