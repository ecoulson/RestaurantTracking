import Joi from "@hapi/joi";

const EmailBodySchema = Joi.object({
    email: Joi.string().email().required()
})

const OrganizationIdParametersSchema = Joi.object({
    organizationId: Joi.string().required()
});

const RegisterOrganizationSchema = Joi.object({
    organizationId: Joi.string().required(),
    organizationName: Joi.string().required()
})

const OrganizationPINLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const OrganizationAccountRegistrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export {
    EmailBodySchema,
    OrganizationIdParametersSchema,
    RegisterOrganizationSchema,
    OrganizationPINLoginSchema,
    OrganizationAccountRegistrationSchema
};