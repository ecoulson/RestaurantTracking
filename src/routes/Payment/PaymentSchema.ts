import Joi from "@hapi/joi";

const PaymentBodySchema = Joi.object({
    cart: Joi.array().items(
        Joi.object({
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            productImage: Joi.string().required()
        })
    ).required()
})

export {
    PaymentBodySchema,
};