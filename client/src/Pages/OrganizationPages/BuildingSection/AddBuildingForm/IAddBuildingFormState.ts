import BuildingType from "../../../../Components/BuildingDropdown/BuildingType";

export default interface IAddBuildingFormState {
    buildingName: string;
    buildingType: BuildingType;
    send: boolean;
}