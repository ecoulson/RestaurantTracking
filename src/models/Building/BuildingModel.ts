import { model } from "mongoose";
import IBuilding from "./IBuilding";
import IBuildingModel from "./IBuildingModel";
import BuildingSchema from "./BuildingSchema";

export default model<IBuilding, IBuildingModel>("Building", BuildingSchema);