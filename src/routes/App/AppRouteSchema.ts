import Joi from "@hapi/joi";

const CreateAppSchema = Joi.object({
    organizationId: Joi.string().required(),
    stripeProductId: Joi.string().required(),
    stripeSubscriptionId: Joi.string().required()
})

export {
    CreateAppSchema
}