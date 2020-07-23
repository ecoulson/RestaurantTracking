import BuildingType from "../../Components/BuildingDropdown/BuildingType";
import IRequestProps from "../IRequestProps";

export default interface ICreateBuildingRequest extends IRequestProps<{}> {
    organizationId: string;
    buildingName: string;
    buildingType: BuildingType;
}