import Joi from "@hapi/joi";

const LoginBodySchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.bool().required()
})

const IsSessionActiveSchema = Joi.object({
    token: Joi.string().required()
})

export {
    LoginBodySchema,
    IsSessionActiveSchema
};