const Joi = require("@hapi/joi");

const GenerateQRCodeSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
});

const RegisterRestaurantSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required(),
});

const FindRestaurantByIdSchema = Joi.object({
    restaurantId: Joi.string().hex().required(),
})

module.exports = {
    GenerateQRCodeSchema,
    RegisterRestaurantSchema,
    FindRestaurantByIdSchema
};