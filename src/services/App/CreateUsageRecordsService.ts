import ICreateUsageRecordsService from "./ICreateUsageRecordsService";
import IApp from "../../models/App/IApp";
import AppBroker from "../../brokers/AppBroker";
import StripeBroker from "../../brokers/StripeBroker";

export default class CreateUsageRecordsService implements ICreateUsageRecordsService {
    private appBroker : AppBroker;
    private stripeBroker : StripeBroker;

    constructor(appBroker : AppBroker, stripeBroker : StripeBroker) {
        this.appBroker = appBroker;
        this.stripeBroker = stripeBroker;
    }

    async createUsageRecord(app : IApp) {
        const subscription = await this.stripeBroker.getSubscription(app.stripeSubscriptionId)
        await this.stripeBroker.createUsageRecord(
            subscription.items.data[0].id, 
            app.usage, 
            Math.floor(Date.now() / 1000)
        );
        app.usage = 0;
        await this.appBroker.save(app);
    }
}