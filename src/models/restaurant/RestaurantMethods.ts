import { logger } from "../../lib/logging";
import IRestaurant from "./IRestaurant";

export default class RestaurantMethods {
    static async serialize() {
        const context : IRestaurant = RestaurantMethods.getContext.bind(this)();
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