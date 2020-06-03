import { logger } from "../../lib/logging";
import ICheckIn from "./ICheckIn";
import ModelMethods from "../ModelMethods";

export default class CheckInMethods {
    static async serialize() {
        const context : ICheckIn = ModelMethods.getContext<ICheckIn>(this);
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
}