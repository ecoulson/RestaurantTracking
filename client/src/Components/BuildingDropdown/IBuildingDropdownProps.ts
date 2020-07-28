import BuildingType from "./BuildingType";
import IBuilding from "../../API/GetBuildingsRequest/IBuilding";

export default interface IBuildingDropdownProps {
    type: BuildingType;
    organizationId: string;
    id: string;
    dark? : boolean;
    iconColor? : string;
    hoverColor? : string;
    onChange: (building : IBuilding) => void
}