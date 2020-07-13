import Joi from "@hapi/joi";

const ExistsBodySchema = Joi.object({
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
    PIN: Joi.string().regex(new RegExp("\\d{4}")).required()
})

export {
    ExistsBodySchema,
    OrganizationIdParametersSchema,
    RegisterOrganizationSchema,
    OrganizationPINLoginSchema
};