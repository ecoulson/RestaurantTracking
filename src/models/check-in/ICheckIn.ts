import ICheckInBase from "./ICheckInBase";
import IRestaurantSchema from "../restaurant/IRestaurantSchema";

export default interface ICheckIn extends ICheckInBase {
    restaurantId: IRestaurantSchema["_id"];
}