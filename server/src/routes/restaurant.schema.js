const Joi = require("@hapi/joi");
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const GenerateQRCodeSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
});

const RegisterRestaurantSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required().custom((value, helpers) => {
        const number = phoneUtil.parseAndKeepRawInput(value, "US");
        if (!phoneUtil.isPossibleNumber(number)) {
            return helpers.error("any.invalid");
        }
        return value;
    }),
});

const FindRestaurantByIdSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
})

module.exports = {
    GenerateQRCodeSchema,
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
};