const Joi = require("@hapi/joi");

// Map is being mocked!!!!!!!!

const CheckingInUserSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
    email: Joi.string().email(),
    number: Joi.string()
}).or("email", "number")

module.exports = {
    CheckingInUserSchema
};