import Joi from "@hapi/joi";

const CreateAppSchema = Joi.object({
    organizationId: Joi.string().required()
})

export {
    CreateAppSchema
}