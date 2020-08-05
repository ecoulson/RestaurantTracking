import Joi from "@hapi/joi";
import AppType from "../../models/App/AppType";

const GetProductPricesSchema = Joi.object({
    type: Joi.string().allow(AppType)
})

export {
    GetProductPricesSchema
}