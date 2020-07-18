import BuildingType from "./BuildingType";
import IBuilding from "../../API/GetBuildingsRequest/IBuilding";

export default interface IBuildingDropdownProps {
    type: BuildingType,
    organizationId: string;
    dark? : boolean;
    iconColor? : string;
    hoverColor? : string;
    onChange: (building : IBuilding, value?: string) => void
}