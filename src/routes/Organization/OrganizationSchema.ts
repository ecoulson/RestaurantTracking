import Joi from "@hapi/joi";

const SignOnBodySchema = Joi.object({
    email: Joi.string().email().required()
})

const SignOnParametersSchema = Joi.object({
    organizationId: Joi.string().required()
});

const RegisterOrganizationSchema = Joi.object({
    organizationId: Joi.string().required(),
    organizationName: Joi.string().required()
})

export {
    SignOnBodySchema,
    SignOnParametersSchema,
    RegisterOrganizationSchema
};