import IGenerator from "./IGenerator";
import IApp from "../../../src/models/App/IApp";
import AppModel from "../../../src/models/App/AppModel";
import AppType from "../../../src/models/App/AppType";

export default class AppGenerator implements IGenerator<IApp> {
    private usage : number;
    private organizationId: string;
    private stripeSubscriptionId: string;
    private stripeProductId: string;

    constructor() {
        this.usage = 0;
    }

    setUsage(usage : number) {
        this.usage = usage;
        return this;
    }

    setOrganizationId(id : string) {
        this.organizationId = id;
        return this;
    }

    setStripeSubscription(id: string) {
        this.stripeSubscriptionId = id;
        return this;
    }

    setStripeProduct(id: string) {
        this.stripeProductId = id;
        return this;
    }

    generate() {
        const app = new AppModel({
            type: AppType.ContactLogs,
            organizationId: this.organizationId,
            stripeSubscriptionId: this.stripeSubscriptionId,
            stripeProductId: this.stripeProductId,
            isActive: true,
            usage: this.usage
        })
        this.reset();
        return app;
    }

    private reset() {
        this.usage = 0;
        this.stripeProductId = "";
        this.organizationId = "";
        this.stripeSubscriptionId = ""
    }
}