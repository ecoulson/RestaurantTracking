import Joi from "@hapi/joi";
import BuildingType from "../../models/Building/BuildingType";

const CreateBuildingSchema = Joi.object({
    organizationId: Joi.string().required(),
    buildingName: Joi.string().required(),
    buildingType: Joi.string().allow(BuildingType).required()
})

export {
    CreateBuildingSchema
}