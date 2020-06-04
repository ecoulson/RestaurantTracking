import Joi from "@hapi/joi";

const RegistrationBodySchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string()
})

export {
    RegistrationBodySchema
};