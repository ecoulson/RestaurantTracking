import CheckInModel from "../models/CheckIn/CheckInModel";

export default class CheckInBroker {
    async getCheckInById(id: string) {
        try {
            return await CheckInModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async getUserCheckIns(userId: string, params?: {
        organizationId?: string
    }) {
        try {
            return await CheckInModel.find({ 
                userId,
                organizationId: params.organizationId ? params.organizationId : ""
            })
        } catch (error) {
            throw error
        }
    }
}