import IRequestProps from "../IRequestProps";
import BuildingType from "../../Components/BuildingDropdown/BuildingType";
import IGetBuildingResponse from "./IGetBuildingsResponse";

export default interface IGetBuildingsRequestProps extends IRequestProps<IGetBuildingResponse> {
    organizationId: string;
}