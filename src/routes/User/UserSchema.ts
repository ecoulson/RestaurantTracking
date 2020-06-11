import Joi from "@hapi/joi";

const RegistrationBodySchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string()
});

const TokenCallbackSchema = Joi.object({
    email: Joi.string().email(),
    token: Joi.string().hex()
})

const TokenBodySchema = Joi.object({
    email: Joi.string().email()
});

const PasswordResetSchema = Joi.object({
    email: Joi.string().email(),
    token: Joi.string().hex(),
    password: Joi.string()
})

export {
    RegistrationBodySchema,
    TokenCallbackSchema,
    TokenBodySchema,
    PasswordResetSchema
};