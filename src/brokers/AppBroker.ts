import AppType from "../models/App/AppType";
import AppModel from "../models/App/AppModel";

export default class AppBroker {
    async createApp(appData: {
        organizationId: string,
        stripeProductId: string,
        stripeSubscriptionId: string,
        type: AppType
    }) {
        try {
            const app = new AppModel(appData)
            return await app.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(appId: string) {
        try {
            return await AppModel.findById(appId);
        } catch (error) {
            throw error;
        }
    }
}