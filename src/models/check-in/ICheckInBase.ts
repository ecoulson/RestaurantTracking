import ICheckInSchema from "./ICheckInSchema";
import ICheckIn from "./ICheckIn";

export default interface ICheckInBase extends ICheckInSchema {
    serialize() : ICheckIn
}