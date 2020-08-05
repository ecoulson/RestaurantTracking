import IGenerator from "./IGenerator";
import IApp from "../../../src/models/App/IApp";
import AppModel from "../../../src/models/App/AppModel";
import AppType from "../../../src/models/App/AppType";

export default class AppGenerator implements IGenerator<IApp> {
    generate() {
        return new AppModel({
            type: AppType.ContactLogs,
            organizationId: "foo",
            stripeSubscriptionId: "foo",
            stripeProductId: "foo",
            isActive: true,
            usage: 0
        })
    }
}