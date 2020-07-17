import IDocument from "../IDocument";
import BuildingType from "./BuildingType";

export default interface IBuildingSchema extends IDocument {
    name: string;
    type: BuildingType;
    organizationId: string;
    rooms: string[]
}