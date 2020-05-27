const Joi = require("@hapi/joi");

const CheckingInUserSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
    email: Joi.string().email().allow(),
    number: Joi.string()
}).or("email", "number");

const GetCheckinSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
})

module.exports = {
    CheckingInUserSchema,
    GetCheckinSchema
};