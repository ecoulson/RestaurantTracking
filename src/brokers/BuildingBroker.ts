import BuildingModel from "../models/Building/BuildingModel";
import BuildingType from "../models/Building/BuildingType";

export default class BuildingBroker {
    async getBuildings(organizationId: string) {
        try {
            return await BuildingModel.find({ organizationId })
        } catch (error) {
            throw error;
        }
    }

    async create(name: string, organizationId: string, type : BuildingType) {
        const building = new BuildingModel({
            name: name,
            organizationId: organizationId,
            type: type
        })
        return await building.save();
    }
}