import IRestaurantSchema from "../restaurant/IRestaurantSchema";
import ICheckInSchema from "./ICheckInSchema";

export default interface ICheckIn extends ICheckInSchema {
    restaurantId: IRestaurantSchema["_id"];
    serialize() : ICheckIn
}