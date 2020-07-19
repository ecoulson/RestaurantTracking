import BuildingModel from "../models/Building/BuildingModel";

export default class BuildingBroker {
    async getBuildings(organizationId: string) {
        try {
            return await BuildingModel.find({ organizationId })
        } catch (error) {
            throw error;
        }
    }
}