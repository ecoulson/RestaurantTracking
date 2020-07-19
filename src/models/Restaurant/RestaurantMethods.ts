import { logger } from "../../lib/logging";
import IRestaurant from "./IRestaurant";
import ModelMethods from "../ModelMethods";

export default class RestaurantMethods {
    static serialize() {
        const context : IRestaurant = ModelMethods.getContext<IRestaurant>(this);
        logger.debug(`Serializing checkin document with id ${context._id}`);
        return {
            __v: context.__v,
            _id: context._id,
            number: context.number,
            name: context.number
        }
    }
}