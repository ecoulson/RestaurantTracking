import Joi from "@hapi/joi";
import AppType from "../../models/App/AppType";

const CreateAppSchema = Joi.object({
    organizationId: Joi.string().required(),
    stripeProductId: Joi.string().required(),
    stripeSubscriptionId: Joi.string().required()
})

const GetAppSchema = Joi.object({
    id: Joi.string().required()
})

const AppIsActiveSchema = Joi.object({
    organizationId: Joi.string().required(),
    type: Joi.string().allow(AppType)
});

export {
    CreateAppSchema,
    GetAppSchema,
    AppIsActiveSchema
}