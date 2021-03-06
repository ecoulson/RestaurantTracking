import Joi from "@hapi/joi";
import { PhoneNumberUtil } from "google-libphonenumber";
import { logger } from "../../lib/logging";

const phoneUtil = PhoneNumberUtil.getInstance();

const GenerateQRCodeSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
});

const RegisterRestaurantSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required().custom((value, helpers) => {
        logger.debug(`Validating ${value} as a US phone number`);
        const number = phoneUtil.parseAndKeepRawInput(value, "US");
        if (!phoneUtil.isPossibleNumber(number)) {
            logger.warn(`${value} is not a possible US phone number`);
            return helpers.error("any.invalid");
        }
        logger.debug(`${value} is a possible US phone number`);
        return value;
    }),
});

const FindRestaurantByIdSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
})

export {
    GenerateQRCodeSchema,
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
};