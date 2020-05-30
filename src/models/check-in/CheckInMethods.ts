import { logger } from "../../lib/logging";
import ICheckIn from "./ICheckIn";

export default class CheckInMethods {
    static async serialize() {
        const context : ICheckIn = CheckInMethods.getContext();
        logger.debug(`Serializing checkin document with id ${context._id}`);
        return {
            __v: context.__v,
            _id: context._id,
            email: context.email,
            number: context.number,
            timeCheckedIn: context.timeCheckedIn,
            restaurantId: context.restaurantId
        }
    }

    private static getContext() {
        return this as unknown as ICheckIn
    }
}