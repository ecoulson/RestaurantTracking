import IBuilding from "../../../../API/GetBuildingsRequest/IBuilding";

export default interface IBuildingListState {
    buildings: IBuilding[];
    send: boolean;
}