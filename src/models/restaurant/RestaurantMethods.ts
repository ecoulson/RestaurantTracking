import { logger } from "../../lib/logging";
import IRestaurant from "./IRestaurant";

export default class RestaurantMetods {
    static async serialize() {
        const context : IRestaurant = RestaurantMetods.getContext();
        logger.debug(`Serializing checkin document with id ${context._id}`);
        return {
            __v: context.__v,
            _id: context._id,
            number: context.number,
            name: context.number
        }
    }

    private static getContext() {
        return this as unknown as IRestaurant
    }
}