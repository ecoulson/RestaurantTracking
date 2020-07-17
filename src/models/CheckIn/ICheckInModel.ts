import ICheckIn from "./ICheckIn";
import { Model } from "mongoose";

export default interface ICheckInModel extends Model<ICheckIn> {
    findByOrganizationId(restaurantId : string) : ICheckIn[];
}