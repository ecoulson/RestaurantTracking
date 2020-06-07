import Joi from "@hapi/joi";

const RegistrationBodySchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string()
});

const VerificationQuerySchema = Joi.object({
    email: Joi.string().email(),
    token: Joi.string().hex()
})

const ResendVerificationEmailBodySchema = Joi.object({
    email: Joi.string().email()
});

export {
    RegistrationBodySchema,
    VerificationQuerySchema,
    ResendVerificationEmailBodySchema
};