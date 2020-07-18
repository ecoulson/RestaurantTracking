import IBuilding from "../../API/GetBuildingsRequest/IBuilding";
import IFormValue from "../FormInput/IFormValue";

export default interface IBuildingDropdownState {
    buildings: IBuilding[],
    value: string
}