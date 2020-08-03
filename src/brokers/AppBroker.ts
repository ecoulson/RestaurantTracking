import AppType from "../models/App/AppType";
import AppModel from "../models/App/AppModel";
import IApp from "../models/App/IApp";

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

    async findBySubscriptionId(stripeSubscriptionId: string) {
        try {
            return await AppModel.findOne({
                stripeSubscriptionId
            })
        } catch (error) {
            throw error;
        }
    }

    async save(app: IApp) {
        try {
            return app.save();
        } catch (error) {
            throw error;
        }
    }
    
    async findAll() {
        try {
            return await AppModel.find();
        } catch (error) {
            throw error;
        }
    }

    async remove(app : IApp) {
        try {
            return await app.remove();
        } catch (error) {
            throw error;
        }
    }

    async findByOrganizationId(organizationId: string, type: AppType) {
        try {
            return await AppModel.findOne({ organizationId, type })
        } catch (error) {
            throw error;
        }
    }
}