import { model } from "mongoose";
import IRestaurantModel from "./IRestaurantModel";
import IRestaurant from "./IRestaurant";
import RestaurantSchema from "./RestaurantSchema";

export default model<IRestaurant, IRestaurantModel>("Restaurant", RestaurantSchema);