import ICheckIn from "./ICheckIn";
import { Model } from "mongoose";

export default interface ICheckInModel extends Model<ICheckIn> {
    findByRestaurantId(restaurantId : string) : ICheckIn[];
}