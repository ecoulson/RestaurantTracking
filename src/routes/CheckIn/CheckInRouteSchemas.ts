import Joi from "@hapi/joi";
import { PhoneNumberUtil } from "google-libphonenumber";
import { logger } from "../../lib/logging"; 

const phoneUtil = PhoneNumberUtil.getInstance();

const CheckingInUserSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
    email: Joi.string().email().allow(null),
    timeCheckedIn: Joi.date().optional().allow(null),
    number: Joi.string().custom((value, helpers) => {
        logger.debug(`Validating ${value} as a US phone number`);
        const number = phoneUtil.parseAndKeepRawInput(value, "US");
        if (!phoneUtil.isPossibleNumber(number)) {
            logger.warn(`${value} is not a possible US phone number`);
            return helpers.error("any.invalid");
        }
        logger.debug(`${value} is a possible US phone number`);
        return value;
    }).allow(null)
}).or("email", "number");

const GetCheckinSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
})

export {
    CheckingInUserSchema,
    GetCheckinSchema
};