const Joi = require("@hapi/joi");
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const CheckingInUserSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
    email: Joi.string().email().allow(),
    number: Joi.string().custom((value, helpers) => {
        const number = phoneUtil.parseAndKeepRawInput(value, "US");
        if (!phoneUtil.isPossibleNumber(number)) {
            return helpers.error("any.invalid");
        }
        return value;
    })
}).or("email", "number");

const GetCheckinSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
})

module.exports = {
    CheckingInUserSchema,
    GetCheckinSchema
};