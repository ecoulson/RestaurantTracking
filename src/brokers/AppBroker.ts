import AppType from "../models/App/AppType";
import AppModel from "../models/App/AppModel";

export default class AppBroker {
    async createApp(organizationId: string, type: AppType) {
        try {
            const app = new AppModel({
                organizationId,
                type
            })
            return await app.save();
        } catch (error) {
            throw error;
        }
    }
}