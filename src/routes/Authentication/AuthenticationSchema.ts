import Joi from "@hapi/joi";

const LoginBodySchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export {
    LoginBodySchema
};