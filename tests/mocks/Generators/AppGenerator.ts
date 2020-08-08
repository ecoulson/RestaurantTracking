import IGenerator from "./IGenerator";
import IApp from "../../../src/models/App/IApp";
import AppModel from "../../../src/models/App/AppModel";
import AppType from "../../../src/models/App/AppType";

export default class AppGenerator implements IGenerator<IApp> {
    private usage : number;

    constructor() {
        this.usage = 0;
    }

    setUsage(usage : number) {
        this.usage = usage;
    }

    generate() {
        const app = new AppModel({
            type: AppType.ContactLogs,
            organizationId: "foo",
            stripeSubscriptionId: "foo",
            stripeProductId: "foo",
            isActive: true,
            usage: this.usage
        })
        this.reset();
        return app;
    }

    private reset() {
        this.usage = 0;
    }
}