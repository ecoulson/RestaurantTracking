import IRestaurantSchema from "./IRestaurantSchema";

export default interface IRestaurant extends IRestaurantSchema {
    serialize() : IRestaurant
}