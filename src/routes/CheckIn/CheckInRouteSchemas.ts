import Joi from "@hapi/joi";

const CheckingInUserSchema = Joi.object({
    organizationId: Joi.string().required(),
    timeCheckedIn: Joi.date().optional().allow(null),
    building: Joi.string().required(),
    room: Joi.string()
})

const GetOrganizationCheckInsSchema = Joi.object({
    organizationId: Joi.string().required(),
})

const GetCheckInSchema = Joi.object({
    checkInId: Joi.string().required()
})

const GetCheckInQRCode = Joi.object({
    organizationId: Joi.string().required(),
    building: Joi.string().required()
})

export {
    CheckingInUserSchema,
    GetOrganizationCheckInsSchema,
    GetCheckInSchema,
    GetCheckInQRCode
};