import { logger } from "../../lib/logging";
import ICheckIn from "./ICheckIn";
import ModelMethods from "../ModelMethods";

export default class CheckInMethods {
    static serialize() {
        const context : ICheckIn = ModelMethods.getContext<ICheckIn>(this);
        logger.debug(`Serializing check in document with id ${context._id}`);
        return {
            __v: context.__v,
            _id: context._id,
            userId: context.userId,
            checkedOut: false,
            timeCheckedOut: context.timeCheckedOut,
            timeCheckedIn: context.timeCheckedIn,
            organizationId: context.organizationId
        }
    }
}