import { model } from "mongoose";
import ICheckIn from "./ICheckIn";
import ICheckInModel from "./ICheckInModel";
import CheckInSchema from "./CheckInSchema";

export default model<ICheckIn, ICheckInModel>("CheckIn", CheckInSchema);