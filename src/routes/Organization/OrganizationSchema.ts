import Joi from "@hapi/joi";
import BuildingType from "../../models/Building/BuildingType";

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

const OrganizationBuildingsSchema = Joi.object({
    organizationId: Joi.string().required(),
    type: Joi.string().allow(BuildingType[BuildingType.Academic], BuildingType[BuildingType.Residential])
})

export {
    EmailBodySchema,
    OrganizationIdParametersSchema,
    RegisterOrganizationSchema,
    OrganizationPINLoginSchema,
    OrganizationAccountRegistrationSchema,
    OrganizationBuildingsSchema
};