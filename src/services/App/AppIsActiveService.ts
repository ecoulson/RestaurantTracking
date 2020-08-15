import IAppIsActiveService from "./IAppIsActiveService";
import AppType from "../../models/App/AppType";
import AppBroker from "../../brokers/AppBroker";

export default class AppIsActiveService implements IAppIsActiveService {
    private appBroker : AppBroker;

    constructor(appBroker : AppBroker) {
        this.appBroker = appBroker;
    }

    async isActive(appType : AppType, organizationId: string) {
        const app = await this.appBroker.findByOrganizationId(organizationId, appType);
        if (!app) {
            throw new Error(`[${organizationId}]: does not have a registered ${appType} application`)
        }
        return app.isActive
    }
}