import CheckInModel from "../models/CheckIn/CheckInModel";

export default class CheckInBroker {
    async getCheckInById(id: string) {
        try {
            return await CheckInModel.findById(id);
        } catch (error) {
            throw error;
        }
    }
}