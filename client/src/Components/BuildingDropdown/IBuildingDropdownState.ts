import IBuilding from "../../API/GetBuildingsRequest/IBuilding";

export default interface IBuildingDropdownState {
    buildings: IBuilding[],
    value: string
}